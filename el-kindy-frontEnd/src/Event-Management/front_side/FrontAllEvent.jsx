import React from 'react'
import UserSideLayout from "../../dashboard-layout/UserSideLayout";
import ViewAllEvents from '../../ui/ViewAllEvents';

export default function FrontAllEvent() {
  return (
    <UserSideLayout>
        <ViewAllEvents ></ViewAllEvents>
    </UserSideLayout>
  )
}
