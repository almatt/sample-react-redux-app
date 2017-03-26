import React, { Component } from 'react'
import { Alert, Table, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'

class AddForm extends Component {

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
      amount: this.amount.value,
      bankId: this.bank.value
    })
    console.log('amount', this.amount.value)
    console.log('bank', this.bank.value)
    this.amount.value = ''
    this.bank.value = -1
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
                ref={(node) => { this.amount = node }}
                className="form-control"
                placeholder="Сумма"
              />
            </FormGroup>
            <FormGroup>
              <Label for="bank">Банк</Label>
              <select
                id="bank"
                name="select"
                ref={node => { this.bank = node }}
                className="form-control"
              >
                <option value={-1}>{isLoading ? 'Загрузка...' : 'Выберите банк'}</option>
                {banks.map((bank, i) => (
                  <option key={i} value={bank.id}>{bank.name}</option>
                ))}
              </select>
            </FormGroup>
            <Button type="submit" outline color="primary" block>{isCreating ? 'Добавление' : 'Добавить'}</Button>
          </Form>
        </Col>
      </Row>
    )
  }
}

export default AddForm
