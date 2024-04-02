import { ChainId, Token, Pair, TokenAmount, WETH, Price } from '../src'

describe('Pair', () => {
  const LAMP = new Token(ChainId.MODE, '0xF7ca2401709BC01Eba07d46c8d59e865C983e1AC', 18, 'LAMP', 'LAMP Coin')
  const PIX = new Token(ChainId.MODE, '0x4Bd692dbA81074BC2FA9abDcffE7324680d7A1c1', 18, 'PIX', 'PIX Coin');

  describe('constructor', () => {
    it('cannot be used for tokens on different chains', () => {
      expect(() => new Pair(new TokenAmount(LAMP, '100'), new TokenAmount(WETH[ChainId.MAINNET], '100'))).toThrow(
        'CHAIN_IDS'
      )
    })
  })

  describe('#getAddress', () => {
    it('returns the correct address', () => {
      expect(Pair.getAddress(LAMP, PIX)).toEqual('0x115253bcd7D2c7ca706ca8605eE4Fd7D5fCEEBA0')
    })
  })

  describe('#token0', () => {
    it('always is the token that sorts before', () => {
      const pair1 = new Pair(new TokenAmount(LAMP, '100'), new TokenAmount(PIX, '100'))
      // console.log('Token0 for pair1:', pair1.token0)
      expect(pair1.token0).toEqual(PIX)

      const pair2 = new Pair(new TokenAmount(PIX, '100'), new TokenAmount(LAMP, '100'))
      // console.log('Token0 for pair2:', pair2.token0)
      expect(pair2.token0).toEqual(PIX)
    })
  })

  describe('#token1', () => {
    it('always is the token that sorts after', () => {
      const pair1 = new Pair(new TokenAmount(LAMP, '100'), new TokenAmount(PIX, '100'))
      // console.log('Token0 for pair1:', pair1.token0)
      expect(pair1.token0).toEqual(PIX)

      const pair2 = new Pair(new TokenAmount(PIX, '100'), new TokenAmount(LAMP, '100'))
      // console.log('Token0 for pair2:', pair2.token0)
      expect(pair2.token0).toEqual(PIX)
    })
  })

  describe('#reserve0', () => {
    it('always comes from the token that sorts before', () => {
      expect(new Pair(new TokenAmount(LAMP, '100'), new TokenAmount(PIX, '101')).reserve0).toEqual(
        new TokenAmount(PIX, '101')
      )
      expect(new Pair(new TokenAmount(PIX, '101'), new TokenAmount(LAMP, '100')).reserve0).toEqual(
        new TokenAmount(PIX, '101')
      )
    })
  })

  describe('#reserve1', () => {
    it('always comes from the token that sorts after', () => {
      expect(new Pair(new TokenAmount(LAMP, '100'), new TokenAmount(PIX, '101')).reserve1).toEqual(
        new TokenAmount(LAMP, '100')
      )
      expect(new Pair(new TokenAmount(PIX, '101'), new TokenAmount(LAMP, '100')).reserve1).toEqual(
        new TokenAmount(LAMP, '100')
      )
    })
  })

  describe('#token0Price', () => {
    it('returns price of token0 in terms of token1', () => {
      expect(new Pair(new TokenAmount(LAMP, '101'), new TokenAmount(PIX, '100')).token0Price).toEqual(
        new Price(PIX, LAMP, '100', '101')
      )
      expect(new Pair(new TokenAmount(PIX, '100'), new TokenAmount(LAMP, '101')).token0Price).toEqual(
        new Price(PIX, LAMP, '100', '101')
      )
    })
  })

  describe('#token1Price', () => {
    it('returns price of token1 in terms of token0', () => {
      expect(new Pair(new TokenAmount(LAMP, '101'), new TokenAmount(PIX, '100')).token1Price).toEqual(
        new Price(LAMP, PIX, '101', '100')
      )
      expect(new Pair(new TokenAmount(PIX, '100'), new TokenAmount(LAMP, '101')).token1Price).toEqual(
        new Price(LAMP, PIX, '101', '100')
      )
    })
  })

  describe('#priceOf', () => {
    const pair = new Pair(new TokenAmount(LAMP, '101'), new TokenAmount(PIX, '100'))
    it('returns price of token in terms of other token', () => {
      expect(pair.priceOf(PIX)).toEqual(pair.token0Price)
      expect(pair.priceOf(LAMP)).toEqual(pair.token1Price)
    })

    it('throws if invalid token', () => {
      expect(() => pair.priceOf(WETH[ChainId.MODE])).toThrow('TOKEN')
    })
  })

  describe('#reserveOf', () => {
    it('returns reserves of the given token', () => {
      expect(new Pair(new TokenAmount(LAMP, '100'), new TokenAmount(PIX, '101')).reserveOf(LAMP)).toEqual(
        new TokenAmount(LAMP, '100')
      )
      expect(new Pair(new TokenAmount(PIX, '101'), new TokenAmount(LAMP, '100')).reserveOf(LAMP)).toEqual(
        new TokenAmount(LAMP, '100')
      )
    })

    it('throws if not in the pair', () => {
      expect(() =>
        new Pair(new TokenAmount(PIX, '101'), new TokenAmount(LAMP, '100')).reserveOf(WETH[ChainId.MODE])
      ).toThrow('TOKEN')
    })
  })

  describe('#chainId', () => {
    it('returns the token0 chainId', () => {
      expect(new Pair(new TokenAmount(LAMP, '100'), new TokenAmount(PIX, '100')).chainId).toEqual(ChainId.MODE)
      expect(new Pair(new TokenAmount(PIX, '100'), new TokenAmount(LAMP, '100')).chainId).toEqual(ChainId.MODE)
    })
  })

  describe('#involvesToken', () => {
    expect(new Pair(new TokenAmount(LAMP, '100'), new TokenAmount(PIX, '100')).involvesToken(LAMP)).toEqual(true)
    expect(new Pair(new TokenAmount(LAMP, '100'), new TokenAmount(PIX, '100')).involvesToken(PIX)).toEqual(true)
    expect(
      new Pair(new TokenAmount(LAMP, '100'), new TokenAmount(PIX, '100')).involvesToken(WETH[ChainId.MODE])
    ).toEqual(false)
  })
})
