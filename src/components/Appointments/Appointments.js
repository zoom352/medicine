import React, { Component } from 'react'

import {Form} from 'reactstrap'
import Moment from 'react-moment'
import {map, filter} from 'underscore'

import Table from '../Table/Table'
import Header from '../Header/Header'
import TextField from '../Form/TextField/TextField'
import DateField from '../Form/DateField/DateField'
import CheckboxField from '../Form/CheckboxField/CheckboxField'

import './Appointments.scss'

import { ReactComponent as Appointment } from '../../images/appointment.svg'

import { appointments as data } from '../../lib/MockData'

const TITLE = 'Приёмы'

const USER = 'Иванов Иван Иванович'

export default class Appointments extends Component {

  state = {
    filter: {
      startDate: null,
      endDate: null,
      clientName: '',
      onlyMe: false
    }
  }

  onChangeFilterField = (name, value) => {
    const { filter } = this.state

    this.setState({
      filter: {...filter, ...{[name]: value}}
    })
  }

  onChangeFilterDateField = (name, value) => {
    const { filter } = this.state

    this.setState({
      filter: {...filter, ...{[name]: value && value.getTime()}}
    })
  }

  render() {
    const {
      startDate,
      endDate,
      clientName,
      onlyMe,
    } = this.state.filter

    let filtered = filter(data, o => {
      return (startDate ? o.date >= startDate : true) && 
      (endDate ? o.date <= endDate : true) && 
      (clientName ? (clientName.length > 2 ? o.clientName.includes(clientName) : true) : true) && 
      (onlyMe ? o.holderName === USER : true)
    })

    return (
      <div className='Appointments'>
        <Header
          title={TITLE}
          userName={USER}
          className='Appointments-Header'
          bodyClassName='Appointments-HeaderBody'
          renderIcon={() => (
            <Appointment className='Header-Icon' />
          )}
        />
        <div className='Appointments-Body'>
          <div className='Appointments-Filter'>
            <Form className='Appointments-FilterForm'>
              <DateField
                hasTime
                name='startDate'
                value={startDate}
                dateFormat='dd/MM/yyyy HH:mm'
                timeFormat='HH:mm'
                placeholder='С'
                className='Appointments-FilterField'
                onChange={this.onChangeFilterDateField}
              />
              <DateField
                hasTime
                name='endDate'
                value={endDate}
                dateFormat='dd/MM/yyyy HH:mm'
                timeFormat='HH:mm'
                placeholder='По'
                className='Appointments-FilterField'
                onChange={this.onChangeFilterDateField}
              />
              <TextField
                name='clientName'
                value={clientName}
                placeholder='Клиент'
                className='Appointments-FilterField'
                onChange={this.onChangeFilterField}
              />
              <CheckboxField
                name='onlyMe'
                label='Только я'
                value={onlyMe}
                className='Appointments-FilterField'
                onChange={this.onChangeFilterField}
              />
            </Form>
          </div>
          <Table
            data={filtered}
            className='AppointmentList'            
            columns={[
              {
                dataField: 'date',
                text: 'Дата',
                headerStyle: {
                  width: '150px'
                },
                formatter: (v, row) => {
                  return (
                    <Moment date={v} format='DD.MM.YYYY HH.mm'/>
                  )
                }
              },
              {
                dataField: 'clientName',
                text: 'Клиент',
                headerStyle: {
                  width: '300px'
                }
              },
              {
                dataField: 'status',
                text: 'Статус'
              },
              {
                dataField: 'holderName',
                text: 'Принимающий',
                headerStyle: {
                  width: '300px'
                }
              },
              {
                dataField: 'compliences',
                text: 'Жалобы',
                headerStyle: {
                  width: '200px'
                }
              },
              {
                dataField: 'diagnosis',
                text: 'Диагноз',
                headerStyle: {
                  width: '200px'
                }
              }      
            ]}
          />
        </div>
      </div>
    )
  }
}