import { Mail, PhoneCall } from 'lucide-react'
import Image from 'next/image'

export default function ProfileCard({ name, title, email, phone, image }) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg">
      <div>
        <Image
          src={image}
          alt="Search"
          width={500}
          height={500}
        />
      </div>
      <div>
        <h1 className="font-bold font-poppins text-xl">{name}</h1>
        <p>{title}</p>
      </div>
      <div className="flex flex-col gap-2 text-darkb">
        <div className="flex flex-row gap-2">
          <Mail /> {email}
        </div>
        <div className="flex flex-row gap-2">
          <PhoneCall /> {phone}
        </div>
      </div>
    </div>
  )
}
