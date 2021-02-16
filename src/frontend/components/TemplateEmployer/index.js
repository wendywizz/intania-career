import React, { useEffect, useState } from "react"
import { Spinner } from "reactstrap"
import TemplateUserPanel from "Frontend/components/TemplateUserPanel"
import { EMPLOYER_JOB_PATH, EMPLOYER_RESUME_PATH, EMPLOYER_SETTING_PATH } from "Frontend/configs/paths"

function TemplateEmployer({ children }) {
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    setUserId(123)
    setReady(true)
  })

  function setNavConfig() {
    return [
      {
        text: "", children: [
          { text: "จัดการงาน", link: EMPLOYER_JOB_PATH(userId) },
          { text: "รายการสมัครงาน", link: EMPLOYER_RESUME_PATH(userId) },
        ]
      },
      {
        text: "", children: [
          { text: "ตั้งค่า", link: EMPLOYER_SETTING_PATH(userId) }
        ]
      }
    ]
  }

  return (
    !ready ? <Spinner /> : (
      <TemplateUserPanel navConfig={setNavConfig()} sidebarTitle="Employer Menu">
        {children}
      </TemplateUserPanel>
    )
  )
}
export default TemplateEmployer