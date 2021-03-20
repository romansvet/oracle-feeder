import * as config from 'config'
import { Provider, ProviderOptions } from 'provider/base'
import { CurrencyLayer, AlphaVantage, Fixer, BandProtocol } from './quoter'
import { CurrencyLayer, AlphaVantage, Fixer, ExchangeRateHost } from './quoter'

class FiatProvider extends Provider {
  constructor(options: ProviderOptions) {
    super(options)

    const { currencylayer, alphavantage, fixer, bandprotocol, exchangeratehost } = config.fiatProvider

    currencylayer && this.quoters.push(new CurrencyLayer(currencylayer))
    alphavantage && this.quoters.push(new AlphaVantage(alphavantage))
    fixer && this.quoters.push(new Fixer(fixer))


    bandprotocol && this.quoters.push(new BandProtocol(bandprotocol))
    exchangeratehost && this.quoters.push(new ExchangeRateHost(exchangeratehost))
  }

  public async initialize(): Promise<void> {
    await super.initialize()

    await this.tick(Date.now())
  }
}

export default FiatProvider
