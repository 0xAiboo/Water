use anchor_lang::prelude::*;

declare_id!("GgsaKcZvYS8xW7y4yaV5oChZAEqrrLM4FewQsw1zf3dN");

#[program]
pub mod my_solana_project {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
