//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract stableCoin is ERC20, ERC20Burnable, Ownable {
    
    constructor() ERC20("MyStableToken", "MST") {
        _mint(msg.sender, 1 ** decimals());
    }


    function mint(address to, uint256 amount) external{
        // require(msg.sender == tokenContract,"Not authorized");
        _mint(to, amount);
    }
    function burn(address _accAddress,uint256 _amount) external{
        _burn(_accAddress, _amount);
    }


}

// StableCoin Address: 0x612f012889a3f8B4175e7C10Ed895a3E50fe0318
// Access Address: 0x5c3344e78E1025656429ea95295380c211656682
