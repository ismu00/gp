import { connectionStr } from '@/app/lib/db'
import { OrderSchema } from '@/app/lib/orderModel'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'

export async function GET() {
  await mongoose.connect(connectionStr)

  const orders = await OrderSchema.find({ billedStatus: false })

  return NextResponse.json({ result: orders })
}

export async function POST(req) {
  await mongoose.connect(connectionStr)
  const payload = await req.json()

  // Generate unique order number
  const orderNumber = 'JM-' + Date.now()

  // Attach order number to payload
  const newOrder = new OrderSchema({ ...payload, orderNumber })

  await newOrder.save()

  // Return result to frontend
  return NextResponse.json({
    success: true,
    orderNumber,
    result: newOrder, // optional, for debugging
  })
}




'use client'
import { IoAlertCircleOutline } from 'react-icons/io5'
import { IoCheckmarkCircleSharp } from 'react-icons/io5'
import { LuPrinter } from 'react-icons/lu'
import { IoMdRefresh } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'

import { useEffect, useState } from 'react'
import './billing.css'
import { IoMdClose } from 'react-icons/io'
import PrintComponent from '@/app/components/printComp/PrintComponent'
import PrintComponent2 from '@/app/components/printComp2/PrintComponent2'

export default function Billing() {
  const [orderData, setOrderData] = useState([])
  const [billData, setBillData] = useState([])
  const [amountReceived, setAmountReceived] = useState([])
  const [paymentStatus, setPaymentStatus] = useState('')
  const [deliveryStatus, setDeliveryStatus] = useState('')
  const [billedStatus, setBilledStatus] = useState(true)
  const [spinning, setSpinning] = useState(false)

  let balance = amountReceived - billData.total

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setSpinning(true) // start spinning

    try {
      const data = await fetch('/api/orders')
      const result = await data.json()
      console.log(result)
      setOrderData(result.result)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setTimeout(() => setSpinning(false), 1000) // smooth stop after 1s
    }
  }
  const deleteOrder = async (id) => {
    if (!id) return

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this order?'
    )
    if (!confirmDelete) return

    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        // If deleted item is currently viewed, reset the view
        if (billData._id === id) {
          setBillData([])
          setAmountReceived('')
        }
        fetchData()
      } else {
        alert('Failed to delete the order.')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('An error occurred while deleting.')
    }
  }

  const viewBill = (item) => {
    setBillData(item)
    setAmountReceived(item.amountReceived || '')
    setPaymentStatus(item.paymentStatus || '')
    setDeliveryStatus(item.deliveryStatus || '')
    console.log(item)
  }

  const handleSaveUpdate = async () => {
    if (!billData._id) return

    const updated = {
      paymentStatus,
      amountReceived,
      deliveryStatus,
    }

    try {
      const res = await fetch(`/api/orders/${billData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updated),
      })

      if (res.ok) {
        const updatedOrder = await res.json()
        setBillData((prev) => ({ ...prev, ...updated }))
        fetchData()
      } else {
        alert('Failed to update statuses.')
      }
    } catch (error) {
      console.error(error)
      alert('Error updating statuses.')
    }
  }
  const createInvoice = async () => {
    if (!billData._id) return

    const updated = {
      billedStatus,
    }

    try {
      const res = await fetch(`/api/orders/${billData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updated),
      })

      if (res.ok) {
        const updatedOrder = await res.json()
        setBillData((prev) => ({ ...prev, ...updated }))
        alert('Created invoice successfully!')
        setBillData([])
        setAmountReceived('')
        fetchData()
      } else {
        alert('Failed to create invoice')
      }
    } catch (error) {
      console.error(error)
      alert('Error updating statuses.')
    }
  }
  return (
    <div className='billing-container'>
      {billData.cartItems ? (
        <div className='Bill-view-container'>
          <div className='bill-box'>
            <div className='bill-header'>
              <h2>Invoice</h2>
              <p>
                <IoMdClose
                  className='bill-close'
                  onClick={() => {
                    setBillData([])
                    setAmountReceived('')
                  }}
                />
              </p>
            </div>
            <div className='bill-customer'>
              <div className='bill-customer-details'>
                <p>Invoice : {billData.orderNumber}</p>
                <p>
                  Recipient:{' '}
                  <span className='bold'>{billData.customerName}</span>
                </p>
                <p>
                  Campus:
                  <span className='bold'> {billData.campus}</span>
                </p>
              </div>
              <div className='bill-customer-time'>
                <p>
                  Date:{' '}
                  {(() => {
                    const [year, month, day] = billData.createdAt
                      .split('T')[0]
                      .split('-')
                    return `${day}-${month}-${year}`
                  })()}
                </p>

                <p>
                  Time:{' '}
                  {new Date(billData.createdAt).toLocaleTimeString('en-US')}
                </p>
              </div>
            </div>
            <div className='bill-deatils'>
              <h2>Details</h2>
              <div className='bill-items'>
                <table
                  cellPadding='1'
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                  }}
                >
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Items</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                    <tr style={{ height: '10px' }}></tr>
                    <tr>
                      <td colSpan='5'>
                        <hr style={{ border: '0.5px solid #00000051' }} />
                      </td>
                    </tr>
                  </thead>

                  <tbody>
                    <tr style={{ height: '10px' }}></tr>
                    {billData.cartItems.map((item, index) => (
                      <tr style={{ height: '30px' }} key={index}>
                        <td className='tds'>{index + 1}</td>
                        <td className='tds'>{item.name}</td>
                        <td className='tds'>
                          {item.price % 1 === 0
                            ? item.price
                            : item.price.toFixed(2)}
                        </td>
                        <td className='tds'>{item.count}</td>
                        <td className='tds'>
                          {(item.price * item.count) % 1 === 0
                            ? item.price * item.count
                            : (item.price * item.count).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                    <tr style={{ height: '10px' }}></tr>

                    <tr style={{ height: '10px' }}>
                      <td colSpan='5'>
                        <hr style={{ border: '0.5px solid #00000051' }} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className='bill-total'>
                <div>Grand Total:</div>
                <div>{billData.total}</div>
              </div>
            </div>
            <div className='bill-alert'>
              {billData.deliveryStatus === 'Delivered' &&
                billData.paymentStatus === 'paid' && (
                  <div className='bill-alert-success'>
                    <IoCheckmarkCircleSharp
                      size={30}
                      style={{ color: '#08841b' }}
                    />
                    <p>
                      Item has been {billData.deliveryStatus}, and Paid by{' '}
                      {billData.paymentMode}
                    </p>
                  </div>
                )}

              {(billData.deliveryStatus === 'not-Delivered' ||
                billData.paymentStatus === 'not-paid') && (
                <div className='bill-alert-failed'>
                  <div className='alert-message'>
                    {' '}
                    <IoAlertCircleOutline
                      size={30}
                      style={{ color: '#f7941d' }}
                    />
                    <p>
                      Item is {billData.deliveryStatus}, and{' '}
                      {billData.paymentStatus} for
                    </p>
                  </div>
                  <div className='bill-cash-pay'>
                    {billData.paymentStatus === 'not-paid' && (
                      <>
                        {' '}
                        <input
                          className='amount-pay'
                          value={amountReceived}
                          placeholder='Amount Received'
                          onChange={(e) => setAmountReceived(e.target.value)}
                        />
                        <p>Balance : {balance} </p>
                      </>
                    )}

                    {billData.paymentStatus === 'not-paid' && (
                      <div className='update-inputs'>
                        <input
                          type='radio'
                          name='paymentStatus'
                          id='paid'
                          checked={paymentStatus === 'paid'}
                          onChange={() => setPaymentStatus('paid')}
                        />
                        <label className='labels' htmlFor='paid'>
                          Paid
                        </label>
                        <br />
                        <input
                          type='radio'
                          name='paymentStatus'
                          id='not-paid'
                          checked={paymentStatus === 'not-paid'}
                          onChange={() => setPaymentStatus('not-paid')}
                        />
                        <label className='labels' htmlFor='not-paid'>
                          Not Paid
                        </label>
                      </div>
                    )}

                    {billData.deliveryStatus === 'not-Delivered' && (
                      <div className='update-inputs'>
                        <input
                          type='radio'
                          name='deliveryStatus'
                          id='delivered'
                          checked={deliveryStatus === 'Delivered'}
                          onChange={() => setDeliveryStatus('Delivered')}
                        />
                        <label className='labels' htmlFor='delivered'>
                          Delivered
                        </label>
                        <br />
                        <input
                          type='radio'
                          name='deliveryStatus'
                          id='not-delivered'
                          checked={deliveryStatus === 'not-Delivered'}
                          onChange={() => setDeliveryStatus('not-Delivered')}
                        />
                        <label className='labels' htmlFor='not-delivered'>
                          Not Delivered
                        </label>
                      </div>
                    )}
                  </div>
                  {(billData.paymentStatus === 'not-paid' ||
                    billData.deliveryStatus === 'not-Delivered') && (
                    <button className='save-button' onClick={handleSaveUpdate}>
                      Save
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className='bill-footer'>
              {/* <button
                onClick={() => {
                  setBillData([])
                  setAmountReceived('')
                }}
                className='cancel-button'
              >
                Cancel
              </button> */}
            </div>
            <div className='bt'>
              <button
                className='Create-button'
                disabled={
                  billData.paymentStatus === 'not-paid' ||
                  billData.deliveryStatus === 'not-Delivered'
                }
                onClick={createInvoice}
              >
                Create Invoice
              </button>

              <PrintComponent2 billData={billData} />
              <PrintComponent billData={billData} />
            </div>
          </div>
        </div>
      ) : (
        ''
      )}

      <div className='table'>
        <div className='table-header'>
          <p className='no'>No</p>
          <p className='s'>Counter</p>
          <p className='s'>Name</p>
          <p className='s'>Campus</p>
          <p className='s'>Payment Status</p>
          <p className='s'>Delivery Status</p>
          <p className='no'>Total</p>
          <button className='refresh-button' onClick={fetchData}>
            <IoMdRefresh size={30} className={spinning ? 'spin' : ''} />
          </button>
        </div>

        {orderData &&
          orderData.map((item, index) => {
            return (
              <div className='table-items' key={index}>
                <p className='no'>{index + 1}</p>
                <p className='s'>{item.user}</p>
                <p className='s'>{item.customerName}</p>
                <p className='s'>{item.campus}</p>
                <p
                  className='s'
                  style={
                    item.paymentStatus === 'paid'
                      ? { color: 'green' }
                      : { color: 'red' }
                  }
                >
                  {item.paymentStatus}
                </p>
                <p
                  className='s'
                  style={
                    item.deliveryStatus === 'Delivered'
                      ? { color: 'green' }
                      : { color: 'red' }
                  }
                >
                  {item.deliveryStatus}
                </p>
                <p className='no'>{item.total}</p>
                <button onClick={() => viewBill(item)} className='viewbtn'>
                  View
                </button>
                <MdDelete
                  onClick={() => deleteOrder(item._id)}
                  style={{
                    color: 'rgba(76, 76, 76, 0.49)',
                    cursor: 'pointer',
                    marginLeft: '10px',
                  }}
                  size={25}
                  className='delete'
                />
                {/* <button onClick={() => printAddress(item)} className='viewbtn'>
                  Print Address
                </button> */}
              </div>
            )
          })}
      </div>
    </div>
  )
}