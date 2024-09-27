use anchor_lang::prelude::*;

#[program]
pub mod crowdfunding {
    use super::*;

    pub fn create_campaign(
        ctx: Context<CreateCampaign>,
        name: String,
        description: String,
        target_amount: u64,
    ) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;
        campaign.name = name;
        campaign.description = description;
        campaign.target_amount = target_amount;
        campaign.amount_collected = 0;
        campaign.creator = *ctx.accounts.user.key;
        campaign.withdrawn = false;
        Ok(())
    }

    pub fn donate(ctx: Context<Donate>, amount: u64) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;
        let user = &ctx.accounts.user;

        // 转移 SOL 从用户到活动账户
        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            anchor_lang::system_program::Transfer {
                from: user.to_account_info(),
                to: campaign.to_account_info(),
            },
        );
        anchor_lang::system_program::transfer(cpi_context, amount)?;

        campaign.amount_collected += amount;
        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;
        let creator = &ctx.accounts.creator;

        require!(
            campaign.creator == *creator.key,
            ErrorCode::OnlyCreatorCanWithdraw
        );
        require!(
            campaign.amount_collected >= campaign.target_amount,
            ErrorCode::TargetAmountNotReached
        );
        require!(!campaign.withdrawn, ErrorCode::AlreadyWithdrawn);

        let rent_balance = Rent::get()?.minimum_balance(campaign.to_account_info().data_len());
        let withdraw_amount = campaign.to_account_info().lamports() - rent_balance;

        **campaign.to_account_info().try_borrow_mut_lamports()? -= withdraw_amount;
        **creator.to_account_info().try_borrow_mut_lamports()? += withdraw_amount;

        campaign.withdrawn = true;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateCampaign<'info> {
    #[account(init, payer = user, space = 8 + 32 + 200 + 200 + 8 + 8 + 32 + 1)]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Donate<'info> {
    #[account(mut)]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}




#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub creator: Signer<'info>,
}

#[account]
pub struct Campaign {
    pub creator: Pubkey,
    pub name: String,
    pub description: String,
    pub target_amount: u64,
    pub amount_collected: u64,
    pub withdrawn: bool,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Only the creator can withdraw funds")]
    OnlyCreatorCanWithdraw,
    #[msg("Cannot withdraw until target amount is reached")]
    TargetAmountNotReached,
    #[msg("Funds have already been withdrawn")]
    AlreadyWithdrawn,
}
