

const spacesUrl = 'https://v1brla82hd.execute-api.eu-west-1.amazonaws.com/prod/'

export const config = {
    SPACES_PHOTOS_BUCKET: 'profile-photos-0a1ae6b80ef2',
    PROFILE_PHOTOS_BUCKET: 'spaces-photos-0a1ae6b80ef2',
    api: {
        baseUrl: spacesUrl,
        spacesUrl: `${spacesUrl}spaces/`,
        reservationsUrl: `${spacesUrl}reservations/`
    },
    REGION: 'ap-southeast-1',
    USER_POOL_ID: 'ap-southeast-1_u1iicGqTS',
    APP_CLIENT_ID: '4v8qqdtt58mkm4l8hbjapjjinu',
    TEST_USER_NAME: 'tula',
    TEST_USER_PASSWORD: 'Test@1234',
    IDENTITY_POOL_ID: 'ap-southeast-1:015a5c3a-10f1-4f6f-8724-d5c8bb28bb77'
}

