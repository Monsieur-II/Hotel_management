/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../helpers'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'
import { useAuth } from '../../../../app/modules/auth'

export function AsideMenuMain() {
  const intl = useIntl()

  const {currentUser} = useAuth()
  // console.log('AsideMenuMain: ',currentUser)
  // console.log('AsideMenuMain Id: ',currentUser?.roleId)
  return (
    <>
      
      <AsideMenuItem
        to='/'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />

  
      <AsideMenuItemWithSub
        to='#'
        icon='/media/icons/duotune/communication/com013.svg'
        title={currentUser?.role.toLowerCase()==="Manager".toLocaleLowerCase()?'Back Office':'Front Office'}
      >
        <AsideMenuItem
          to='frontOffice/walkIn/'
          hasBullet={false}
          icon='/media/icons/duotune/general/gen005.svg'
          title='Entries'
        />
        

        {/* <AsideMenuItem
          to='billing/*'
          // to='#'
          hasBullet={false}
          icon='/media/icons/duotune/general/gen005.svg'
          title='Billing'
        /> */}
      </AsideMenuItemWithSub>
      
      <AsideMenuItemWithSub to='#' icon='/media/icons/duotune/communication/com013.svg' title='GRM'>
        <AsideMenuItem
          to='grm/Guests/'
          hasBullet={false}
          icon='/media/icons/duotune/general/gen005.svg'
          title='Guests'
        />
        <AsideMenuItem
          to='grm/Notes/'
          hasBullet={false}
          icon='/media/icons/duotune/general/gen028.svg'
          title='Notes'
        />
        
      </AsideMenuItemWithSub>
      {/* )} */}
      

     

      <AsideMenuItemWithSub
        to='#'
        icon='/media/icons/duotune/communication/com013.svg'
        title='Setup'
      >
        {/* <AsideMenuItemWithSub
          to='#'
          hasBullet={false}
          icon='/media/icons/duotune/general/gen005.svg'
          title='Rooms'
        > */}
        {/* {currentUser?.role.toLowerCase()==="Manager".toLocaleLowerCase()?null:( */}
        {/* <AsideMenuItem
          to='paymentNotes/'
          hasBullet={false}
          icon='/media/icons/duotune/general/gen005.svg'
          title='Payment Notes'
        /> */}
        {/*  )} */}
        {/* { */}
        <AsideMenuItem
          to='paymentMethod/'
          hasBullet={false}
          icon='/media/icons/duotune/general/gen005.svg'
          title='Payment Methods'
        />
        {currentUser?.role.toLowerCase()==="Cashier".toLocaleLowerCase()?null:(<AsideMenuItem
          to='currency/'
          hasBullet={false}
          icon='/media/icons/duotune/general/gen005.svg'
          title='Currency'
        />)}
        {
        // currentUser?.role.toLowerCase()==="Manager".toLocaleLowerCase()||
        currentUser?.role.toLowerCase()==="Cashier".toLocaleLowerCase()?null:(<>
        {/* <AsideMenuItem
          to='company/'
          hasBullet={false}
          icon='/media/icons/duotune/general/gen005.svg'
          title='Company'
        /> */}
        {/* <AsideMenuItem
          to='tax/'
          hasBullet={false}
          icon='/media/icons/duotune/general/gen005.svg'
          title='Tax'
        /> */}
          <AsideMenuItem
            to='roomType/'
            hasBullet={false}
            icon='/media/icons/duotune/general/gen005.svg'
            title='Rooms'
          />
          <AsideMenuItem
            to='/services/category'
            hasBullet={false}
            icon='/media/icons/duotune/general/gen005.svg'
            title='Services'
          /></>)}

        
      </AsideMenuItemWithSub>
      
      {currentUser?.role.toLowerCase()==="Manager".toLocaleLowerCase()||currentUser?.role.toLowerCase()==="Cashier".toLocaleLowerCase()?null:(<AsideMenuItemWithSub
        to='#'
        icon='/media/icons/duotune/communication/com013.svg'
        title='User Management'
      >

        <AsideMenuItem
          to='/users'
          hasBullet={false}
          icon='/media/icons/duotune/general/gen005.svg'
          title='Users'
        />
        <AsideMenuItem
          to='/roles'
          hasBullet={false}
          icon='/media/icons/duotune/general/gen005.svg'
          title='Roles'
        />
      </AsideMenuItemWithSub>
)}
    
      
    </>
  )
}
