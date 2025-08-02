use anchor_lang::prelude::*;

declare_id!("9v1mmvCjtnqsDHTcid8j35vu6qnxV7sSiaN7bTPZU1RM");

#[program]
pub mod donate {
    use super::*;

    pub fn donate_me(ctx: Context<DonateMe>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(amount:u64)]
pub struct DonateMe<'info> {
    #[account(mut)]
    pub Signer:<'info,Signer>
}
