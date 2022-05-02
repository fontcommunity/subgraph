import { BigInt } from "@graphprotocol/graph-ts"
import {
  FontNFT,
  Approval,
  ApprovalForAll,
  BidCanceled,
  BidOrder,
  Boosted,
  BoughtLicense,
  EarningsClaimed,
  EditedPaymentTokens,
  OrderBidApproved,
  OrderBought,
  OrderCanceled,
  OrderCreated,
  OrderEdited,
  RewardsClaimed,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  RoyalitiesUpdated,
  Transfer,
  UserAddedBulk,
  UserEdited
} from "../generated/FontNFT/FontNFT"
import { ExampleEntity } from "../generated/schema"

export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.owner = event.params.owner
  entity.approved = event.params.approved

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.DEFAULT_ADMIN_ROLE(...)
  // - contract.FontERC20Address(...)
  // - contract.FontRewardPaused(...)
  // - contract.FontRewardPerToken(...)
  // - contract.NFTBoost(...)
  // - contract.OrderID(...)
  // - contract.OriginalNFTCreators(...)
  // - contract.balanceOf(...)
  // - contract.commissionFees(...)
  // - contract.exchangeFees(...)
  // - contract.feesDistributionAddress(...)
  // - contract.getApproved(...)
  // - contract.getRealOwner(...)
  // - contract.getRoleAdmin(...)
  // - contract.hasRole(...)
  // - contract.isApprovedForAll(...)
  // - contract.name(...)
  // - contract.onERC721Received(...)
  // - contract.ownerOf(...)
  // - contract.supportsInterface(...)
  // - contract.symbol(...)
  // - contract.tokenURI(...)
  // - contract.viewBid(...)
  // - contract.viewEarnings(...)
  // - contract.viewFontRewards(...)
  // - contract.viewNFT(...)
  // - contract.viewOrderBids(...)
  // - contract.viewPaymentMethod(...)
}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleBidCanceled(event: BidCanceled): void {}

export function handleBidOrder(event: BidOrder): void {}

export function handleBoosted(event: Boosted): void {}

export function handleBoughtLicense(event: BoughtLicense): void {}

export function handleEarningsClaimed(event: EarningsClaimed): void {}

export function handleEditedPaymentTokens(event: EditedPaymentTokens): void {}

export function handleOrderBidApproved(event: OrderBidApproved): void {}

export function handleOrderBought(event: OrderBought): void {}

export function handleOrderCanceled(event: OrderCanceled): void {}

export function handleOrderCreated(event: OrderCreated): void {}

export function handleOrderEdited(event: OrderEdited): void {}

export function handleRewardsClaimed(event: RewardsClaimed): void {}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleRoyalitiesUpdated(event: RoyalitiesUpdated): void {}

export function handleTransfer(event: Transfer): void {}

export function handleUserAddedBulk(event: UserAddedBulk): void {}

export function handleUserEdited(event: UserEdited): void {}
