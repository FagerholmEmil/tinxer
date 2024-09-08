import React from 'react'
import { createClientServer } from "@/utils/supabase/server";
import ProfileContent from '@/components/ProfileContent';


const ProfilePage = async () => {
  const supabase = createClientServer();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Profile: {user?.user_metadata.full_name || 'Emil Fagerholm'}</h1>
      <ProfileContent />
    </div>
  )
}

export default ProfilePage