import React, { Component, PropTypes } from 'react'
import { Table, Row, Col, Form, FormGroup, Label, Button } from 'reactstrap'
import icons from 'glyphicons'

class Transactions extends Component {

  static propTypes: {
    deleteItem: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    transactions: PropTypes.array.isRequired,
    banks: PropTypes.array.isRequired,
    getTransactions: PropTypes.func.isRequired,
    getBanks: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { transactions, getTransactions, banks, getBanks } = this.props
    if (!transactions.length)
      getTransactions()
  }

  deleteTransaction(id) {
    const { deleteItem } = this.props
    deleteItem(id)
  }

  render() {
    const { isLoading, transactions, banks } = this.props
    const isEmpty = transactions.length === 0
    return (
      <Row>
        <Col>
          <h4 className="page__title">Список транзакции</h4>
          <Table hover>
            <thead>
              <tr>
                <th width="10%">#</th>
                <th width="30%">Сумма</th>
                <th width="50%">Банк</th>
                <th>Удалить</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <tr><td></td><td>Загрузка...</td></tr>}
              {isEmpty
                ? <tr><td></td><td>Нет транзакции</td></tr>
                : transactions.map((transaction , i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{transaction.amount}</td>
                    <td>{transaction.bankName}</td>
                    <td>
                      <Button
                        outline
                        color="danger"
                        size="sm"
                        onClick={this.deleteTransaction.bind(this, transaction.id)}
                      >
                        {icons.crossHeavy}
                      </Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    )
  }
}

export default Transactions
