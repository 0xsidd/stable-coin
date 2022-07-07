//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IUniswapV2Router {

    function getAmountsOut(uint amountIn, 
      address[] memory path)
      external 
      view 
      returns (uint[] memory amounts);
}

interface IStableCoin{
  function mint(address to, uint256 amount) external;
  function burn(address _accAddress,uint256 _amount) external;
}

contract Access{
    address private constant UNISWAP_V2_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    uint256 public inputAmountEth;
    uint256 public outputAmountToken;
    uint256 public getPriceOut;
    uint256 public oneSide;
    uint256 public twoSide;
    uint256 public amountEth;
    mapping(address=>uint256) public ledgerETH;
    mapping(address=>uint256) public ledgerTKN;
    mapping(address=>uint256) public ledgerTIME;



    function getPrice()public view returns(uint256){
      address[]memory path;
      path = new address[](2);
      path[0] = 0xc778417E063141139Fce010982780140Aa0cD5Ab;
      path[1] = 0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa;
      return((IUniswapV2Router(UNISWAP_V2_ROUTER).getAmountsOut(1,path))[1]);
    }

    function getOutstandingCoinAmount()public view returns(uint256){
      return(ledgerTKN[msg.sender]);
    }

    function getStableToken(address _tknAddress)public payable{
      ledgerETH[msg.sender] = msg.value;
      ledgerTIME[msg.sender] = block.timestamp;
      inputAmountEth= msg.value;
      getPriceOut = getPrice();
      amountEth = ((inputAmountEth*10)/17) - (inputAmountEth/100);
      outputAmountToken = amountEth*getPriceOut;
      ledgerTKN[msg.sender] = outputAmountToken;
      IStableCoin(_tknAddress).mint(msg.sender, outputAmountToken);
      
    }

    function getETHBack(address _tknAddress,uint256 _amount) public payable {
      require(_amount<= ledgerTKN[msg.sender],"More tokens than you credited");
      IERC20(_tknAddress).transferFrom(msg.sender, address(this),_amount);
      IStableCoin(_tknAddress).burn(address(this), _amount);
      payable(msg.sender).transfer(((ledgerETH[msg.sender]-(ledgerETH[msg.sender]*(block.timestamp - ledgerTIME[msg.sender])/365 days))*_amount)/ledgerTKN[msg.sender]);
    }

    
}