import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { teachers } from '@/lib/data'
import { Mail, PhoneCall } from 'lucide-react'
import Image from 'next/image'

export default function Teachers() {
  return (
    <div className="p-12 flex flex-col gap-4">
      {teachers.map((teacher, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex flex-row gap-4">
              <Image
                src={teacher.image}
                alt={teacher.name}
                width={100}
                height={100}
              />
              <div>
                <CardTitle>{teacher.name}</CardTitle>
                <CardDescription>{teacher.about}</CardDescription>
                <div className="flex flex-col text-sm text-gray-500">
                  <div className="flex items-center flex-row gap-2">
                    <Mail
                      size={12}
                      className="text-darkb"
                    />
                    {teacher.email}
                  </div>
                  <div className="flex items-center flex-row gap-2">
                    <PhoneCall
                      size={12}
                      className="text-darkb"
                    />
                    {teacher.phone}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
