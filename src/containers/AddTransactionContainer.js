import { connect } from 'react-redux'
import AddTransaction from '../components/AddTransaction'
import { fetchBanks } from '../actions/banks'
import { createTransaction } from '../actions/transactions'

const mapStateToProps = store => ({
  banks: store.banks.items,
  isLoading: store.banks.isLoading,
  isCreating: store.transactions.isCreating,
  isFailedCreate: store.transactions.isFailedCreate,
  didCreated: store.transactions.didCreated
})

const mapDispatchToProps = dispatch => ({
  getBanks() {
    dispatch(fetchBanks())
  },
  addTransaction(transaction) {
    dispatch(createTransaction(transaction))
  }
})

const AddTransactionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTransaction)

export default AddTransactionContainer
