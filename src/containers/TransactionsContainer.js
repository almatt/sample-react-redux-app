import { connect } from 'react-redux'
import Transactions from '../components/Transactions'
import {
  fetchTransactions,
  removeItem
} from '../actions/transactions'
import { fetchBanks } from '../actions/banks'

const mapStateToProps = store => ({
  transactions: store.transactions.items,
  banks: store.banks.items,
  isLoading: store.transactions.isLoading || store.banks.isLoading,
  isAuthenticated: store.auth.isAuthenticated
})

const mapDispatchToProps = (dispatch) => ({
  getTransactions() {
    dispatch(fetchTransactions())
  },
  getBanks() {
    dispatch(fetchBanks())
  },
  deleteItem(id) {
    dispatch(removeItem(id))
  }
})

const TransactionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions)

export default TransactionsContainer
