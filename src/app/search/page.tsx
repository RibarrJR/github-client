'use client';

import { useState } from 'react';
import { getGitHubUser } from '../api/github/action';
import { UserProfileForm } from '@/components/form';
import { GitUserResponse } from '@/types/git';
import { ResponseSuccess } from '@/types/request';

export default function SearchPage() {
  return <SearchUserProfile />;
}

function handleError(
  error: string | null,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
) {
  if (error) {
    setError(error);
  }
}

function handleResult(
  userResponse: ResponseSuccess,
  setResult: React.Dispatch<
    React.SetStateAction<Partial <GitUserResponse> | null>
  >,
) {
  if (userResponse) {
    setResult(userResponse.data);
  } else {
    setResult(null);
  }
}

export function SearchUserProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userRequestData, setUserRequestData] = useState<Partial<GitUserResponse> | null>(null);

  const handleSubmit = async (e: FormData) => {
    setLoading(true);
    const userResponse = await getGitHubUser(e);
    if ('message' in userResponse) {
      handleError(userResponse.message, setError);
    } else {
      handleResult(userResponse, setUserRequestData);
    }
    setLoading(false);
  };

  return (
    <>
      <UserProfileForm action={handleSubmit} />
      {loading && <p>Carregando...</p>}
      {userRequestData?.avatar_url && (
        <div>
          <img src={userRequestData.avatar_url} alt="avatar" />
        </div>
      )}
      {error && <ErrorMessage message={error} />}
    </>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return <p>{message}</p>;
}
