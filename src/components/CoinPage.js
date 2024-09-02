import COLORS from "../Constants";
import "../styles.css";

export default function CoinPage(props) {
  return <>
    <span className="page-heading-text">
      {props.coinSymbol} &middot;&nbsp;
      {props.coinName} </span>
    <span className="page-heading-text-2">
      <img
        src={props.coinPriceChange >= 0 ? 'up-arrow.svg' : 'up-arrow.svg'}
        className={props.coinPriceChange >= 0 ? 'up-arrow' : 'down-arrow'}
        alt="" />
      {props.coinPriceChange}% &middot;&nbsp;
      {props.coinPrice} </span>

    <div className='currency-box-1'>
      <div className="text3"> {props.coinName} <span className="lighter">{props.coinSymbol}</span></div>
      <div className="text4">${Number(props.coinPrice).toFixed(5)}</div>
      <div className="text7"
        style={{
          color: props.coinPriceChange > 0 ? COLORS.blue1 : COLORS.red1,
        }}
      >



        {props.coinPriceChange}%
      </div>

    </div></>
}
