interface Props {
  data: {
    status: any,
    reason: any
  },
}

export const isValidVoter = ({ data }: Props) => {
  return typeof data.reason === 'string' && typeof data.status === 'boolean'
}
