import React, { useRef, useState } from "react";
import {
  Modal,
  Form,
  FormGroup,
  Label,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Alert
} from "reactstrap";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faSpinner,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import DropFileInput from "Frontend/components/DropFileInput";
import { useAuth } from "Shared/context/AuthContext";
import "./index.css";
import { createResume } from "Shared/states/resume/ResumeDatasource";

function FormResume({ submitted, onFormSubmit, ...props }) {
  const refSubmit = useRef(null);
  const { register, handleSubmit, errors } = useForm();
  const [filesUpload, setFilesUpload] = useState();
  const [isFileUploadError, setIsFileUploadError] = useState(false)

  const _handleOnDropResume = (files) => {
    if (files && files.length > 0) {
      setIsFileUploadError(false)
      setFilesUpload(files[0]);
    }
  };

  const _handleSubmitClick = () => {
    refSubmit.current.click();
  };

  const _handleSubmit = (values) => {
    const { name, detail, additional } = values;

    if (!filesUpload) {
      setIsFileUploadError(true)
    } else {
      onFormSubmit({ name, detail, additional, filesUpload });
    }
  };

  return (
    <Modal {...props} keyboard={false} backdrop={"static"}>
      <ModalHeader>เพิ่มใบสมัครงานใหม่</ModalHeader>
      <ModalBody>
        <Form
          className="form-input form-upload"
          onSubmit={handleSubmit(_handleSubmit)}
        >
          <button ref={refSubmit} type="submit" style={{ display: "none " }} />
          <FormGroup>
            <Label>ชื่อบันทึก</Label>
            <input
              type="name"
              name="name"
              id="name"
              className={"form-control " + (errors.name?.type && "is-invalid")}
              ref={register({
                required: true,
              })}
            />
            <p className="input-desc">
              บันทึกชื่อใบสมัครงาน เพื่อสามารถเรียกใช้ได้ถูกต้อง
            </p>
          </FormGroup>
          <FormGroup>
            <Label>อัพโหลดไฟล์ Resume</Label>
            <DropFileInput onDrop={_handleOnDropResume} />
            {isFileUploadError && (
              <Alert color="danger">
                <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                กรุณาอัพโหลดไฟล์ Resume
              </Alert>
            )}
          </FormGroup>
          <FormGroup>
            <Label>รายละเอียดเพิ่มเติม</Label>
            <textarea
              id="additional"
              name="additional"
              className={
                "form-control " + (errors.detail?.type && "is-invalid")
              }
              rows={2}
              ref={register()}
            />
            <p className="input-desc">
              หากมี Resume จากลิงค์ภายนอกหรือรายละเอียดอื่นๆ สามารถระบุได้ที่นี้
            </p>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={_handleSubmitClick} disabled={submitted}>
          {
            submitted ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <FontAwesomeIcon icon={faUpload} />
            )
          }
          {" "}อัพโหลด
        </Button>
        <Button color="danger" onClick={props.toggle} disabled={submitted}>
          ยกเลิก
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default function ModalNewResume({ onSuccess, onError, ...props }) {
  const { authUser } = useAuth()
  const [submitting, setSubmitting] = useState(false)

  const _handleSubmit = (values) => {
    const { name, additional, filesUpload } = values

    setSubmitting(true)
    setTimeout(async () => {
      const userId = authUser.id
      if (userId) {
        const { success, message, error } = await createResume(userId, name, filesUpload, additional)

        if (success) {
          onSuccess(message)
        } else {
          onError({
            code: 403,
            message: error
          })
        }
      } else {
        onError({
          code: 419,
          message: "Session expire, Please go back to login"
        })
      }

      setSubmitting(false)
    }, 1000)
  };

  return (
    <FormResume
      onFormSubmit={_handleSubmit} {...props}
      submitted={submitting}
    />
  );
}