import { ChainId, WETH, Token, Fetcher } from '../src'

// TODO: replace the provider in these tests
describe.skip('data', () => {
  it('Token', async () => {
    const token = await Fetcher.fetchTokenData(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F') // DAI
    expect(token.decimals).toEqual(18)
  })

  it('Token:CACHE', async () => {
    const token = await Fetcher.fetchTokenData(ChainId.MAINNET, '0xE0B7927c4aF23765Cb51314A0E0521A9645F0E2A') // DGD
    expect(token.decimals).toEqual(9)
  })

  it('Pair', async () => {
    const token = new Token(ChainId.MODE, '0x4Bd692dbA81074BC2FA9abDcffE7324680d7A1c1', 18) // PIX
    const pair = await Fetcher.fetchPairData(WETH[ChainId.MODE], token)
    expect(pair.liquidityToken.address).toEqual('0xB2aed7bb3D04ef0C527dc84f1462310e601492c0')
  })
})
