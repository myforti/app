<template>
  <div>
    <AuthPopup />
    <ErrorPopup />
    <AddOrganization />
    <AddAddresses />
    <SuccessOrderPopup />
    <SuccessConsultations />
    <EditOrganiztion />
    <EditAddresse />
    <SuccessPopup />
    <PopupForgotPassword />
    <PopupRestorePassword />
    <FeedbackPopup />
  </div>
</template>

<script>
  import AuthPopup from "@/components/Popups/AuthPopup"
  import ErrorPopup from "@/components/Popups/ErrorPopup"
  import AddOrganization from "@/components/Popups/AddOrganization"
  import AddAddresses from "~/components/Popups/AddAddresses";
  import SuccessOrderPopup from "~/components/Popups/SuccessOrderPopup";
  import SuccessConsultations from "~/components/Popups/SuccessConsultations";
  import EditOrganiztion from "~/components/Popups/EditOrganiztions";
  import EditAddresse from "~/components/Popups/EditAddressePopups";
  import SuccessPopup from "~/components/Popups/SuccessPopup"
  import PopupForgotPassword from "~/components/Popups/PopupForgotPassword"
  import PopupRestorePassword from "~/components/Popups/PopupRestorePassword"
  import FeedbackPopup from "~/components/Popups/FeedbackPopup"

  export default {
    name: "Popups",
    components:{
      AuthPopup,
      ErrorPopup,
      AddOrganization,
      AddAddresses,
      SuccessOrderPopup,
      SuccessConsultations,
      EditOrganiztion,
      EditAddresse,
      SuccessPopup,
      PopupForgotPassword,
      PopupRestorePassword,
      FeedbackPopup
    }
  }
</script>
