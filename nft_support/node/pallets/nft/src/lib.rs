#![cfg_attr(not(feature = "std"), no_std)]

use frame_support::{decl_module, decl_storage, decl_event, decl_error, ensure, dispatch, traits::Get};
use sp_runtime::{DispatchError, DispatchResult};
use frame_system::ensure_signed;

#[cfg(test)]
mod mock;

#[cfg(test)]
mod tests;

pub trait Trait: frame_system::Trait + orml_nft::Trait {
	type Event: From<Event<Self>> + Into<<Self as frame_system::Trait>::Event>;
}

decl_event!(
	pub enum Event<T> where 
		AccountId = <T as frame_system::Trait>::AccountId,
		ClassId = <T as orml_nft::Trait>::ClassId,
		TokenId = <T as orml_nft::Trait>::TokenId,
		TokenData = <T as orml_nft::Trait>::TokenData,
	{
		 /// Created NFT class. \[owner, class_id\]
		 CreatedClass(AccountId, ClassId),
		 /// Minted NFT token. \[from, to, class_id, quantity\]
		 MintedToken(AccountId, AccountId, ClassId, TokenData),
		 /// Transfered NFT token. \[from, to, class_id, token_id\]
		 TransferedToken(AccountId, AccountId, ClassId, TokenId),
	}
);

decl_storage! {
	trait Store for Module<T: Trait> as TemplateModule {
		Something get(fn something): Option<u32>;
	}
}

decl_error! {
	pub enum Error for Module<T: Trait> {
	}
}

decl_module! {
	pub struct Module<T: Trait> for enum Call where origin: T::Origin {
		type Error = Error<T>;
		fn deposit_event() = default;

		#[weight = 10_000 + T::DbWeight::get().writes(1)]
		pub fn create_class(
				origin, 
				metadata: orml_nft::CID, 
				data: <T as orml_nft::Trait>::ClassData
			) -> dispatch::DispatchResult 
		{
			let who = ensure_signed(origin)?;

			let result: Result<T::ClassId, DispatchError> = orml_nft::Module::<T>::create_class(&who, metadata, data);

			Self::deposit_event(RawEvent::CreatedClass(who, result.unwrap()));
			Ok(())
		}

		#[weight = 10_000 + T::DbWeight::get().writes(1)]
		pub fn mint(
				origin, 
				to: T::AccountId, 
				class_id: <T as orml_nft::Trait>::ClassId, 
				metadata: orml_nft::CID, 
				quantity: <T as orml_nft::Trait>::TokenData
			) -> dispatch::DispatchResult 
		{
			let who = ensure_signed(origin)?;

			let _result: Result<T::TokenId, DispatchError> = orml_nft::Module::<T>::mint(&to, class_id, metadata.clone(), quantity.clone());

			Self::deposit_event(RawEvent::MintedToken(who, to, class_id, quantity));
			Ok(())
		}

		#[weight = 10_000 + T::DbWeight::get().writes(1)]
		pub fn transfer(
				origin,
				to: T::AccountId,
				token: (<T as orml_nft::Trait>::ClassId, <T as orml_nft::Trait>::TokenId)
			) -> dispatch::DispatchResult
		{
			let who = ensure_signed(origin)?;
	
			let _result = orml_nft::Module::<T>::transfer(&who, &to, token)?;

			Self::deposit_event(RawEvent::TransferedToken(who, to, token.0, token.1));
			Ok(())
		}
	}
}
