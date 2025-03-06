
const formatCount = (num: number): number => {
    const count = Math.floor(num / 100) * 100
    return count
  }
  
  const formatPrice = (num: number): number => {
    return Number(num.toFixed(2))
  }
  
  
  const getSellPrice = (buyPrice: number, profitRate: number): number => {
    return formatPrice(buyPrice * (1 + profitRate))
  }
  const getSellCount = (buyPrice: number, buyCount: number, sellPrice: number): number => {
    // 买入价格 * 买入数量 / 卖出价格
    return formatCount(buyPrice * buyCount / sellPrice)
  }
  // 买入价格根据首次买入价格 和 级别 计算
  const getBuyPrice = (tlbPrice: number, level: number): number => {
    return formatPrice(tlbPrice * level)
  }
  // 买入数量根据首次买入总价 和 本级别买入价格 计算
  const getBuyCount = (tlbPrice: number, tlbCount: number, buyPrice: number, calcLbAmountType: 'equal' | 'arithmetic', level: number): number => {
    if (calcLbAmountType === 'equal') {
      return formatCount((tlbCount * tlbPrice) / buyPrice)
    } else {
      return formatCount((tlbCount * tlbPrice) / level / buyPrice)
    }
  }
  
  function getCodeData(
    code: number,
    tlbPrice: number, // 首次买入价格
    tlb: {
      count?: number, // 首次买入数量
      amount?: number // 首次买入总价，二者选其一
    },
    profit: {
      rate: number, // 预期收益率
      // amount: number, // 预期收益金额
    },
    levelList = [1, 0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5],
    calcLbAmountType: 'equal' | 'arithmetic' = 'equal', // 等额买入，或等差买入
  ) {
    const tlbCount = tlb.count || (tlb.amount ? tlb.amount / tlbPrice : 0)
    const tlbAmount = tlb.amount || (tlb.count ? tlb.count * tlbPrice : 0)
    const profitRate = profit.rate
  
    // 自买入价格，跌到5折，就不再买入
    // const levelList = [1, 0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5]
    const list = levelList.map(level => {
      // 买入
      const buyPrice = getBuyPrice(tlbPrice, level)
      const buyCount = getBuyCount(tlbPrice, tlbCount, buyPrice, calcLbAmountType, level)
      const buyTotal = formatPrice(buyPrice * buyCount)
      // 卖出
      const sellPrice = getSellPrice(buyPrice, profitRate)
      const sellCount = getSellCount(buyPrice, buyCount, sellPrice)
      const sellTotal = formatPrice(sellPrice * sellCount)
      return {
        level,
        buy: {
          'price': buyPrice,
          'count': buyCount,
          'total': buyTotal
        },
        sell: {
          'price': sellPrice,
          'count': sellCount,
          'total': sellTotal
        }
      }
    })
    return {
      'code': code,
      'name': 'xxxxx',
      'tlbPrice': tlbPrice,
      'tlbCount': tlbCount,
      'tlbAmount': tlbAmount,
      // 'list': list
    }
  }
  export { getCodeData }
  