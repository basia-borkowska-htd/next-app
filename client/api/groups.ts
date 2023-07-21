import { AddGroupType, GroupType, PreviewGroupType, UpdateGroupType } from '@/types/Group'

import { formatters } from '@/utils/formatters'

export const groupsApi = {
  getPublicGroups: async (): Promise<PreviewGroupType[]> => {
    const res = await fetch('http://localhost:3000/api/groups')
    const data = await res.json()
    if (!data?.groups) throw new Error(data.error)
    return data.groups
  },
  getJoinedGroups: async (userId: string): Promise<GroupType[]> => {
    const res = await fetch(`http://localhost:3000/api/groups/${userId}/joined`)
    const data = await res.json()
    if (!data?.groups) throw new Error(data.error)
    return data.groups
  },
  getGroup: async (id: string): Promise<GroupType> => {
    const res = await fetch(`http://localhost:3000/api/groups/${id}`)
    const data = await res.json()
    if (!data?.group) throw new Error(data.error)
    return data.group
  },
  getGroupMembers: async (id: string): Promise<string[]> => {
    const res = await fetch(`http://localhost:3000/api/groups/${id}/members`)
    const data = await res.json()
    if (!data?.members) throw new Error(data.error)
    return data.members
  },
  createGroup: async (group: AddGroupType): Promise<GroupType> => {
    const body = formatters.formatGroup(group)
    const res = await fetch('http://localhost:3000/api/groups', {
      method: 'POST',
      body,
    })
    const data = await res.json()
    if (!data?.group) throw new Error(data.error)
    return data.group
  },
  updateGroup: async (group: UpdateGroupType): Promise<GroupType> => {
    const body = formatters.formatGroup(group)
    const res = await fetch(`http://localhost:3000/api/groups/${group._id}`, {
      method: 'PUT',
      body,
    })
    const data = await res.json()
    if (!data?.group) throw new Error(data.error)
    return data.group
  },
  addGroupMember: async (groupId: string, userId: string): Promise<boolean> => {
    const res = await fetch(`http://localhost:3000/api/groups/${groupId}/addMember`, {
      method: 'PUT',
      body: JSON.stringify(userId),
    })
    const data = await res.json()
    if (!data?.success) throw new Error(data.error)
    return data.success
  },
  removeGroupMember: async (groupId: string, userId: string): Promise<boolean> => {
    const res = await fetch(`http://localhost:3000/api/groups/${groupId}/removeMember`, {
      method: 'PUT',
      body: JSON.stringify(userId),
    })
    const data = await res.json()
    if (!data?.success) throw new Error(data.error)
    return data.success
  },
  deleteGroup: async (id: string): Promise<boolean> => {
    const res = await fetch(`http://localhost:3000/api/groups/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    if (!data?.success) throw new Error(data.error)
    return data.success
  },
}