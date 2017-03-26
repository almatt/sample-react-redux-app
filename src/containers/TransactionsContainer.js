import { connect } from 'react-redux'
import List from '../components/List'
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
)(List)

export default TransactionsContainer
