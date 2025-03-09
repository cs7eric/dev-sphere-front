import UserCard from "@/components/user/user-card.tsx";

export default function UserList() {
  return (
    <>
      <div className="user-list-container w-full flex justify-center">
        <div className="user-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
          {
            Array.from(
              {length: 10}, (_, index) => index + 1)
              .map((_, index) => (
                <UserCard key={index} className="w-full"></UserCard>
              ))
          }
        </div>
      </div>
    </>
  )
}