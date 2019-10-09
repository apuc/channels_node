export interface UserMessageUser {
    username: string;
    avatar: string | null;
    id: number;
}

export interface UserMessageAttachmentRequest {
    type: string;
    options: {
        [key: string]: string | number | null,
        url: string,
    };
}

export interface UserMessageAttachmentResponse {
    id: number;
    status: 'active' | '';
    message_id: number;
    type: string;
    options: {
        [key: string]: string | number | null,
        url: string,
    };
}

export interface UserMessageRequest {
    channel_id: string;
    from: string;
    text: string;
    user_id: string;
    attachments: [UserMessageAttachmentRequest] | [];
}

export interface UserMessageResponse {
    id: number;
    channel: number;
    to: number | null;
    from: UserMessageUser;
    attachments: [UserMessageAttachmentResponse] | [];
    read: number;
    created_at: string;
    text: string;
}

export interface UserTyping {
    user: {
        name: string,
        id: number,
    };
    channelId: number;
    isTyping: boolean;
}

export interface IntegrationMessage {
    channels_ids: number[],
    message:UserMessageResponse
}
