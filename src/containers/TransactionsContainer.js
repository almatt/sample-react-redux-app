import { connect } from 'react-redux'
import Transactions from '../components/Transactions'
import {
  fetchTransactions,
  removeItem
} from '../actions/transactions'

const mapStateToProps = store => ({
  transactions: store.transactions.items,
  isLoading: store.transactions.isLoading,
  isAuthenticated: store.auth.isAuthenticated
})

const mapDispatchToProps = dispatch => ({
  getTransactions() {
    dispatch(fetchTransactions())
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
