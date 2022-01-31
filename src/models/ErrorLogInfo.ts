import { ErrorTypeEnum } from '@/enums/errorTypeEnum'

type ErrorLogInfo = {
    type: ErrorTypeEnum;
    name?: string;
    message: string;
    detail: string;
    url: string;
    time?: string;
    file?: string
}

export default ErrorLogInfo
