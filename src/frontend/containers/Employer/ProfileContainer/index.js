import React from "react"
import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import Content, { ContentBody, ContentHeader, ContentFooter } from "Frontend/components/Content"
import "./index.css"
import defaultLogo from "Frontend/assets/img/default-logo.jpg"

function ProfileContainer() {
  return (
    <Content>
      <ContentHeader title="โปรไฟล์บริษัท" />
      <ContentBody>
        <Form className="distance">
          <FormGroup>
            <Label>ชื่อบริษัท</Label>
            <Input type="text" />
          </FormGroup>
          <FormGroup>
            <Label>เกี่ยวกับบริษัท</Label>
            <Input type="textarea" rows={3} />
          </FormGroup>
          <FormGroup>
            <Label>โลโก้บริษัท</Label>
            <div className="group-image-logo">
              <div class="custom-file">
                <input type="file" class="custom-file-input form-control" id="input-image-logo" />
                <label class="custom-file-label" for="input-image-logo">เลือกไฟล์</label>
              </div>
              <img className="img-preview" src={defaultLogo} alt="default-logo" />
            </div>
          </FormGroup>
          <div>
            <Button color="primary">บันทึก</Button>
          </div>
        </Form>
      </ContentBody>
      <ContentFooter>
        
      </ContentFooter>
    </Content>
  )
}
export default ProfileContainer