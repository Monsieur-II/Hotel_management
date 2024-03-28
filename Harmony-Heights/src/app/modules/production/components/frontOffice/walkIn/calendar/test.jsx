import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars'
import {DropDownListComponent} from '@syncfusion/ej2-react-dropdowns'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import '@syncfusion/ej2-base/styles/material.css'
import '@syncfusion/ej2-calendars/styles/material.css'
import '@syncfusion/ej2-dropdowns/styles/material.css'
import '@syncfusion/ej2-inputs/styles/material.css'
import '@syncfusion/ej2-lists/styles/material.css'
import '@syncfusion/ej2-navigations/styles/material.css'
import '@syncfusion/ej2-popups/styles/material.css'
import '@syncfusion/ej2-splitbuttons/styles/material.css'
import '@syncfusion/ej2-react-schedule/styles/material.css'
import '@syncfusion/ej2-buttons/styles/material.css'
import {Alert, message, Space, Spin} from 'antd'
import axios from 'axios'
import {L10n} from '@syncfusion/ej2-base'
import {
  ScheduleComponent,
  Month,
  Day,
  Week,
  ViewsDirective,
  ViewDirective,
  TimelineViews,
  TimelineMonth,
  Inject,
  ResourcesDirective,
  ResourceDirective,
  Resize,
  DragAndDrop,
} from '@syncfusion/ej2-react-schedule'
// import {Input, message} from 'antd'
import {
  Api_Endpoint,
  fetchRooms,
  fetchGuests,
  fetchBookings,
} from '../../../../../../services/ApiCalls'
import {BASE_URL} from '../../../../urls'
import './index.css'
//Editing editor buttons
L10n.load({
  'en-US': {
    schedule: {
      saveButton: 'Book',
      cancelButton: 'Cancel',
      deleteButton: 'Remove',
      newEvent: 'Book Room',
    },
  },
})

const Calendar = () => {
  let scheduleObj
  let queryClient = useQueryClient()
  const {data: roomsdata} = useQuery('rooms', fetchRooms)
  const {data: guestsdata} = useQuery('guests', fetchGuests)
  const {data: bookingsdata} = useQuery('bookings', fetchBookings)
  const {mutate: addNewBooking} = useMutation((values) => axios.post(`${BASE_URL}/Booking`, values))

 
  const listData = guestsdata?.data.map((e) => {
    // console.log('e',e?.firstname+' '+e?.lastname)
    return {
      id: e?.id,
      name: e?.firstname + ' ' + e?.lastname,
    }
  })

  const onActionBegin = (args) => {
    // console.log('first args', args)
    // args.cancel = true
    // console.log('args', args)

    if (args.data !== undefined) {
      const data = args.data[0] ? args.data[0] : args.data
      // console.log(args?.data[0].Room)
      // console.log(roomsdata?.data.filter(e=>e.name===args?.data[0].Room))
      const dat = roomsdata?.data.find((e) => e.name === args?.data[0].Room)
      // console.log('dat ',dat);
      // console.log('dat.id ',dat['id']);
      // for (let index = 0; index < roomsdata?.data.length; index++) {
      //   // const element = array[index];

      // }
      //Save
      if (args.requestType === 'eventCreate') {
        // console.log("This one here")
        const bookingSchedule = {
          // room: roomsdata?.data[args?.data?.Id-1]?.id,
          roomId: dat['id'],
          bookStart: data.StartTime,
          bookEnd: data.EndTime,
          guestId: data.guests,
          timestamp: new Date(),
          // gameTypeId: data.gameType,
        }

        
        const filteredData = bookingsdata?.data.filter((item) => {
          const startDate = new Date(item.bookStart).toISOString().split('T')[0]
          const endDate = new Date(item.bookEnd).toISOString().split('T')[0]
          const startTime = new Date(data.StartTime).toISOString().split('T')[0]
          const endTime = new Date(data.EndTime).toISOString().split('T')[0]
          return (
            startDate <= endTime &&
            startDate >= startTime &&
            endDate <= endTime &&
            endDate >= startTime
          )
        })

        if (filteredData.length > 0) {
          message.info('Room might have been reserved on the specified date!')
          return
        } else {
          addNewBooking(bookingSchedule, {
            onSuccess: () => {
              message.success('Booking made successfully')
              queryClient.invalidateQueries('bookings')
            },
            onError: (error) => {
              message.error('Booking failed')
            },
          })
        }
        
      }

      //Edit
      if (args.requestType === 'eventChange') {
        console.log('gameSchedule Edit', args)
        const gameSchedule = {
          id: data.id,
          subject: data.Subject,
          startTime: data.StartTime,
          endTime: data.EndTime,
          description: data.guest,
          gameTypeId: data.gameType,
        }
        // updateGameSchedule(gameSchedule)
      }

      if (args.requestType === 'eventRemove') {
        // deleteGameSchedule(data)
      }
    }
  }
  // console.log('gameType', gameType)
  let dropDownListObject //to access the dropdownlist component
  function editorTemplate(props) {
    // console.log('props in editor ', props)
    // console.log('roomName ', roomName)
    // console.log('props ', props['Name'])
    // console.log('props ', props['StartTime'])
    var startT = props['StartTime']
    var Room = props['Name']
    return props !== undefined ? (
      <table className='custom-event-editor' style={{width: '100%'}} cellPadding={5}>
        <tbody>
          <tr>
            <td className='e-textlabel'>Room</td>
            <td colSpan={4}>
              <input
                id='title'
                placeholder='Room'
                data-name='Room'
                name='Room'
                className='e-field e-input'
                type='text'
                style={{width: '100%'}}
                defaultValue={roomsdata?.data[props['Name'] - 1]?.name}
                disabled
              />
            </td>
          </tr>

          <tr>
            <td className='e-textlabel'>Guest</td>
            <td colSpan={4}>
              <DropDownListComponent
                id='guests'
                placeholder='Guest Name'
                data-name='guests'
                className='e-field'
                dataSource={listData}
                fields={{text: 'name', value: 'id'}}
                // value={props && props.gameTypeId ? props.gameTypeId : null}
                style={{width: '100%'}}
              />
            </td>
          </tr>
          <tr>
            <td className='e-textlabel'>From</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                id='StartTime'
                format='dd/MM/yy hh:mm a'
                data-name='StartTime'
                name={'StartTime'}
                // defaultValue={startT}
                value={props['StartTime'] ? props['StartTime'] : props['StartTime']}
                // disabled
                className='e-field'
              ></DateTimePickerComponent>
            </td>
          </tr>
          <tr>
            <td className='e-textlabel'>To</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                id='EndTime'
                format='dd/MM/yy hh:mm a'
                data-name='EndTime'
                name={'EndTime'}
                value={props && props['EndTime'] ? new Date(props['EndTime']) : props['EndTime']}
                className='e-field'
              ></DateTimePickerComponent>
            </td>
          </tr>
        </tbody>
      </table>
    ) : (
      message.error('Please select an event')
    )
  }
  function quickInfoTemplatesHeader(props) {
    console.log('props', props)
  }

 
  let onCellClick = (args) => {
    if (args.element.style.backgroundColor == 'rgb(159, 158, 163)') {
      args.cancel = false
    } else {
      args.cancel = true
    }
  }
  const onCellDoubleClick = (args) => {
    if (args.element.style.backgroundColor == 'rgb(159, 158, 163)') {
      args.cancel = true
      scheduleObj?.openEditor(args, true)
      message.info('Room already occupied!')
    } else {
      args.cancel = true
      scheduleObj?.openEditor(args, 'Add', false)
    }
  }
  function onEventRendered(args) {
    // console.log("this args ", args)
    if (!args.element || !args.data) {
      return
    }
  }
  const book = bookingsdata?.data
  // console.log(book)
  function test(e) {
    book?.find((x) => {
      // console.log("x", x)

      if (x.bookStart === '2023-06-03T00:00:00') {
        return x
      }
    })
  }

  

  function onRenderCell(args) {
    if (args.elementType === 'monthCells' && bookingsdata?.data) {
      const roomIndex = parseInt(args.element.getAttribute('data-group-index')) + 1

      const cellDate = new Date(parseInt(args.element.getAttribute('data-date')))
        .toISOString()
        .split('T')[0]

      const newRooms = bookingsdata?.data.filter((item) => {
        const startDate = new Date(item.bookStart).toISOString().split('T')[0]
        const endDate = new Date(item.bookEnd).toISOString().split('T')[0]

        return (
          parseInt(item.roomId) === parseInt(roomIndex) &&
          cellDate <= endDate &&
          cellDate >= startDate
        )
      })

      if (newRooms !== null && newRooms.length > 0) {
        args.element.style.backgroundColor = '#9f9ea3'
      }
    } else {
      return false
    }
  }

  return roomsdata !== undefined ? (
    <div className='schedule-control-section'>
      <div className='col-lg-12 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent
            cssClass='timeline-resource'
            dateFormat='dd MM yyyy'
            currentView='TimelineMonth'
            ref={(t) => (scheduleObj = t)}
            actionBegin={onActionBegin}
            editorTemplate={editorTemplate}
            eventRendered={onEventRendered}
            cellClick={onCellClick}
            renderCell={onRenderCell.bind(this)}
            cellDoubleClick={onCellDoubleClick}
            loading={true}
            width='100%'
            height='650px'
            group={{enableCompactView: false, resources: ['MeetingRoom']}}
            eventSettings={{template: editorTemplate}}
            quickInfoTemplatesHeader={{template: quickInfoTemplatesHeader}}
          >
            <ResourcesDirective>
              <ResourceDirective
                field='Name'
                title='Name'
                name='MeetingRoom'
                allowMultiple={true}
                dataSource={roomsdata?.data}
                textField='name'
                idField='id'
                colorField='color'
              ></ResourceDirective>
            </ResourcesDirective>
            <ViewsDirective>
              <ViewDirective option='TimelineMonth' />
            </ViewsDirective>
            <Inject services={[TimelineViews, TimelineMonth, Week, Month, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
      </div>
    </div>
  ) : (
    <Space size='middle'>
      <Spin size='large' />
    </Space>
  )
}
export {Calendar}


