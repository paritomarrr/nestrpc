import {Contract, ethers} from "ethers"
import { useState } from "react";
import ContractABI from "../artifacts/contracts/DepositToken.sol/DepositToken.json"

const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
const contractAddress = "0x0B2D235652623d957140123144fCd0B60984036D"

function DepositToken () {
    const [loading, setLoading] = useState(false)
    const [contract, setContract] = useState(null)
    const [balance, setBalance] = useState(null)
    const contractOwner = "0x87658a6c698D1392d45B0AB756F969361AcB912d"

    // load contract
    const loadContract = async () => {
        setLoading(true);
        try {
            const signer = provider.getSigner();
            const contract = new Contract(contractAddress, ContractABI, provider);
            setContract(contract)
            const balance = await contract.getBalance()
            setBalance(balance)
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    // transfer funds to contract
    const handleTransfer = async () => {
        if (!contract) {
            return;
        }
        setLoading(true)
        try {
            const tx = await contract.transfer()
            await tx.wait()
            setLoading(false)
            loadContract()
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    // withdrawal funds
    const handleWithdrawal = async () => {
        if (!contract) {
            return
        }
        setLoading(true)
        try {
            const tx = await contract.withdrawal(contractOwner)
            await tx.wait()
            setLoading(false)
            loadContract()
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    return (
        <div>
            {loading && <div>Still loading :O </div>}
            {!loading && (
                <>
                <button onClick={loadContract}>Load Contract</button>
                <div>Contract Owner: {contractOwner}</div>
                <div>Balance: {balance?.toString()}</div>
                <button onClick={handleTransfer}>Transfer Funds to Contract</button>
                <button onClick={handleWithdrawal}>Withdraw Funds</button>
                </>
            )}
        </div>
    )
}

export default DepositToken