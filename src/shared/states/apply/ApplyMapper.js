import { isset } from "Shared/utils/string"
import UserMapper from "../user/UserMapper"
import { ResumeMapper } from "../resume/ResumeMapper"
import { JobMapper } from "../job/JobMapper"

function ApplyMapper(data) {
  return {
    id: isset(data.apply_id),
    status: isset(data.apply_status),
    job_id: isset(data.job_id),
    jobAsso: isset(data.job_asso) && JobMapper(data.job_asso),
    resume_id: isset(data.resume_id),
    resumeAsso: isset(data.resume_asso) && ResumeMapper(data.resume_asso),
    createdBy: isset(data.created_by) && UserMapper(data.created_by),
    createdAt: isset(data.created_at)
  }
}
export {
  ApplyMapper
}