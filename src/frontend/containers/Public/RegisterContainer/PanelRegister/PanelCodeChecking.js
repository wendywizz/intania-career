import React, { useState } from "react"
import { Form, FormGroup, Input, Label, Button, Alert } from "reactstrap"
import useAuthProvider from "Frontend/utils/hook/useAuth"
import { faExclamationTriangle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PanelCodeChecking({ onCallback }) {
  const { identifyStudent } = useAuthProvider()
  const [loading, setLoading] = useState(false)
  const [studentCode, setStudentCode] = useState(6310130019);
  const [cardNo, setCardNo] = useState(1749900201835);
  const [message, setMessage] = useState(null);

  const _handleSubmit = (e) => {
    e.preventDefault()

    setLoading(true)
    setTimeout(async () => {
      const { status, message } = await identifyStudent(studentCode, cardNo);
      
      if (status) {
        onCallback(true, { studentCode, cardNo })
      } else {
        setMessage(message)
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="panel panel-code-checking">
      <Form onSubmit={_handleSubmit}>
        <div className="input-inner">
          <FormGroup>
            <Label>ตรวจสอบรหัสนักศึกษา</Label>
            <Input placeholder="ระบุรหัสนักศึกษา" value={studentCode} onChange={(e) => setStudentCode(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>รหัสประจำตัวประชาชน</Label>
            <Input placeholder="ระบุตัวเลข 13 หลัก Ex. xxxxxxxxxxxxx" value={cardNo} onChange={(e) => setCardNo(e.target.value)} />
          </FormGroup>
        </div>
        <Button block color="primary" disabled={loading}>
          {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : <span>ตรวจสอบ</span>}
        </Button>
        {
          message && (
            <Alert color="danger">
              <b><FontAwesomeIcon icon={faExclamationTriangle} /> Error</b>
              <p>{message}</p>
            </Alert>
          )
        }
      </Form>
    </div>
  )
}
export default PanelCodeChecking