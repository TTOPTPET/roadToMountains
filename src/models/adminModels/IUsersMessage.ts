interface IUserInfo {
    phone: string;
    email: string;
    name: string;
}

interface ITourDate {
    from: string;
    to: string;
}

interface ITourInfo {
    tourDate: ITourDate;
    tourId: string;
    publicTourId: string;
    tourName: string
    creatorName: string;
}

interface IDataMessage {
    tourInfo: ITourInfo;
    message: string;
}

export interface IUserMessage {
    userId: string;
    userInfo: IUserInfo;
    messageId: string;
    statusMessage: string;
    typeMessage: string;
    dataMessage: IDataMessage;
    createAt: Date;
}