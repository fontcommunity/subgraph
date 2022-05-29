import { Address, BigInt,Value, Bytes,ethereum } from "@graphprotocol/graph-ts"
import {
  FontNFT,
  SafeMintAndListCall,
  MapAddUserBulkCall,
  MapEditUserCall,
  SafeMintCall,
  UserEdited

} from "../generated/FontNFT/FontNFT"
import { FontNFTEntity, DebuggerStuff } from "../generated/schema"
//import * as _ from 'underscore'

import { logStore } from 'matchstick-as/assembly/store'



export function handlesafeMintAndList(call: SafeMintAndListCall): void {


  let id = call.transaction.from.toHex();
  console.log(id);

  




  //console.log(call);

  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  //let entity = FontNFTEntity.load(call.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  //if (!entity) {
  //  entity = new FontNFTEntity(call.transaction.from.toHex())

    // Entity fields can be set using simple assignments
  //}

  // BigInt and BigDecimal math are supported
  //entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  //entity.owner = event.params.owner
  //entity.approved = event.params.approved

  // Entities can be written to the store with `.save()`
  //entity.save()

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

export function handlemapAddUserBulk(call: MapAddUserBulkCall): void {
  var _users:Address[] = call.inputs._address;
  var _nfts:BigInt[] = call.inputs._nft;
  
  if(_users.length > 0 && _users.length == _nfts.length) {
    var _user:Address;
    var _nft:string;
      
    var i:i32;
    var currentTimeInSeconds = call.block.timestamp.toI32();

    for(i = 0; i < _users.length; i++) {
      _user = _users[i];
      _nft = _nfts[i].toString();
      var fontEntity = FontNFTEntity.load(_nft);
      if(!fontEntity) {
        fontEntity = new FontNFTEntity(_nft)
        fontEntity.set('dateMapped', Value.fromI32(<i32>currentTimeInSeconds));
      }
      else {
        fontEntity.set('dateUpdated', Value.fromI32(currentTimeInSeconds));
      }
      
      fontEntity.set('originalNFTCreator', Value.fromAddress(_user));
      fontEntity.set('realOwner', Value.fromAddress(_user));

      fontEntity.save();

    }
  }
}

export function handlemapEditUser(call: MapEditUserCall): void {
  
  var _user:Address = call.inputs._address;
  var _nft:string = call.inputs._nft.toString();
  
  var fontEntity = FontNFTEntity.load(_nft);
  if(!fontEntity) {
    fontEntity = new FontNFTEntity(_nft)
    var currentTimeInSeconds = call.block.timestamp.toI32();
    fontEntity.set('dateMapped', Value.fromI32(currentTimeInSeconds));
  }
  else {
    fontEntity.set('dateUpdated', Value.fromI32(currentTimeInSeconds));
  }

  fontEntity.set('originalNFTCreator', Value.fromAddress(_user));
  fontEntity.set('realOwner', Value.fromAddress(_user));
  fontEntity.save();
}

export function handlesafeMint(call: SafeMintCall): void {
  var royality:i32 = call.inputs.royality;
  var nft:string = call.inputs.nft.toString();

  var fontEntity = FontNFTEntity.load(nft);
  if(fontEntity) {

    fontEntity.set('royality', Value.fromI32(royality));
    var currentTimeInSeconds = call.block.timestamp.toI32();
    fontEntity.set('dateMinted', Value.fromI32(currentTimeInSeconds));
    fontEntity.set('dateUpdated', Value.fromI32(currentTimeInSeconds));
    fontEntity.set('ownersCount', Value.fromI32(1));
    fontEntity.set('minted', Value.fromBoolean(true));
    fontEntity.set('custody', Value.fromBoolean(false));

    var originalNFTCreator:Address = call.from;
    fontEntity.set('realOwner', Value.fromAddress(originalNFTCreator));

    fontEntity.save();

  }
}

/*

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


*/

function getCurrentTimeFromBlock(Block: ethereum.Block):i32 {
  _Block = new Block();
  return _Block.timestamp.toI32();
  //var __Block = new _Block();
  //_Block.timestamp()

  //var _Asdasd = <i32> = newDate().now;
  //var _date = new Date(0);
  //return _date.now();
  //return Math.floor(_date / 1000);

}