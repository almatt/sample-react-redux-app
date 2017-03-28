import React, { Component } from 'react'
import { Alert, Table, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'

class AddTransaction extends Component {

  static propTypes: {
    addTransaction: PropTypes.func.isRequired,
    getBanks: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isCreating: PropTypes.bool.isRequired,
    isFailedCreate: PropTypes.bool.isRequired,
    didCreated: PropTypes.bool.isRequired,
    banks: PropTypes.array.isRequired,
  }

  componentDidMount() {
    const { getBanks } = this.props
    getBanks()
  }

  handleSubmit(e) {
    e.preventDefault()
    const { addTransaction } = this.props
    addTransaction({
      amount: e.target.amount.value,
      bankId: e.target.bankId.value
    })
    e.target.amount.value = ''
    e.target.bankId.value = -1
  }

  render() {
    const { isLoading, banks, isCreating, isFailedCreate, didCreated } = this.props
    return (
      <Row>
        <Col>
          <h4 className="page__title">Добавить транзакцию</h4>
          {isFailedCreate
            &&
            <Alert color="danger">
              <strong>Упс!</strong> Возникла проблема при добавлении.
            </Alert>
          }
          {didCreated
            &&
            <Alert color="success">
              <strong>Успешно</strong> добавлена транзакция.
            </Alert>
          }
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup>
              <Label for="amount">Сумма</Label>
              <input
                type="number"
                name="amount"
                id="amount"
                className="form-control"
                placeholder="Сумма"
              />
            </FormGroup>
            <FormGroup>
              <Label for="bank">Банк</Label>
              <select
                id="bank"
                name="bankId"
                className="form-control"
              >
                <option value={-1}>{isLoading ? 'Загрузка...' : 'Выберите банк'}</option>
                {banks.map((bank, i) => (
                  <option key={i} value={bank.id}>{bank.name}</option>
                ))}
              </select>
            </FormGroup>
            <Button type="submit" outline color="primary" block>{isCreating ? 'Добавление...' : 'Добавить'}</Button>
          </Form>
        </Col>
      </Row>
    )
  }
}

export default AddTransaction
