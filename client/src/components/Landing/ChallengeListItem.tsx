import { Link, ListIcon, ListItem } from '@chakra-ui/core'
import React from 'react'
import NextLink from 'next/link'
import { FaCheckCircle } from 'react-icons/fa'
import { FailProblemFragment, MeQuery, PopularProblemFragment } from '../../generated/graphql'

interface ChallengeListItemProps {
   data: FailProblemFragment | PopularProblemFragment | null
   me: MeQuery | undefined
}

export const ChallengeListItem: React.FC<ChallengeListItemProps> = ({ data, me }) => {
   return (
      <ListItem fontSize={[15]} m={1} fontWeight="medium">
         <Link>
            <NextLink
               href={`${data?.problemGroup}/[index]`}
               as={`/${data?.problemGroup}/${data?.index}`}
            >
               <a>{data?.name}</a>
            </NextLink>
            {data && me?.me?.completedProblems?.includes(data._id) && (
               <ListIcon icon={FaCheckCircle} ml={2} color="green.500" size={'13px'} />
            )}
         </Link>
      </ListItem>
   )
}
