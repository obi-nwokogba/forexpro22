import COLORS from "../Constants";
import "../styles.css";

export default function CoinBox1(props) {
  return <div className='currency-box-1'>
    <div className="currency-box-inside">
      <div className="text3"> {props.coinName} <span className="lighter">{props.coinSymbol}</span></div>
      <div className="text4">${Number(props.coinPrice).toFixed(5)}</div>
      <div className="text7"
        style={{
          color: props.coinPriceChange > 0 ? COLORS.blue1 : COLORS.red1,
        }}
      >


        <img
          src={props.coinPriceChange >= 0 ? 'up-arrow.svg' : 'up-arrow.svg'}
          className={props.coinPriceChange >= 0 ? 'up-arrow' : 'down-arrow'}
          alt="" />
        {props.coinPriceChange}%
      </div>
    </div>
  </div>
}
