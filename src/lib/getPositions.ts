import Lyra from '@lyrafinance/lyra-js'
import Fauna from '../fauna';

export default async function getPositions(account: string): Promise<any> {
    const lyra = new Lyra();
    let positions = await lyra.openPositions(account)
    const market = await positions[0].market()
    //console.log(market)

    const spotPrice = market.spotPrice
    console.log(spotPrice )
    // get positions in db 
    // get liquidations
    // add skip if exists

    let x = positions.map(pos => (Fauna({
        id: pos.id,
        owner: pos.owner,
        marketName: pos.marketName,
        marketAddress: pos.marketAddress,
        size:  pos.size,
        isOpen: pos.isOpen,
        isCall: pos.isCall,
        isLong: pos.isLong,
        isSettled: pos.isSettled,
        isBaseCollateral: pos.collateral?.isBase,
        liquidationPrice: pos.collateral?.liquidationPrice,
        numTrades: pos.trades().length,
        avgCostPerOption: pos.avgCostPerOption(),
        pricePerOption: pos.pricePerOption,
        realizedPnl: pos.realizedPnl(),
        realizedPnlPercent: pos.realizedPnlPercent(),
        unrealizedPnl: pos.unrealizedPnl(),
        unrealizedPnlPercent: pos.unrealizedPnlPercent(),
        expiryTimestamp: pos.expiryTimestamp,
      })))

      
    
    return `test`
};


// new fucntion to update tracking

