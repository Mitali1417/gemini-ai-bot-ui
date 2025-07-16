import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { useCountries } from '../hooks/useCountries';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '../ui/select';

const phoneSchema = z.object({
  country: z.string().min(1, 'Select a country'),
  phone: z.string().min(7, 'Enter a valid phone number'),
});

type PhoneForm = z.infer<typeof phoneSchema>;

type Country = {
  name: string;
  callingCode: string;
  flag: string;
  code: string;
};

interface SignInFormProps {
  onSubmit: (phone: string, country: string) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PhoneForm>({ resolver: zodResolver(phoneSchema) });

  const { data: countries = [], isLoading, error } = useCountries();
  const selectedCountry = watch('country');

  const onFormSubmit = (data: PhoneForm) => {
    const [callingCode] = data.country.split('|');
    onSubmit(data.phone, callingCode);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <Label className="block mb-1 font-medium">Country</Label>
        <Select
          value={selectedCountry || ''}
          onValueChange={v => setValue('country', v)}
          disabled={isLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={isLoading ? 'Loading countries...' : 'Select country'} />
          </SelectTrigger>
          <SelectContent>
            {countries.map((c: Country) => (
              <SelectItem key={c.code} value={`${c.callingCode}|${c.code}`}>
                {c.flag} {c.name} ({c.callingCode})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <span className="text-red-500 text-xs">Failed to load country list.</span>}
        {errors.country && (
          <span className="text-red-500 text-xs">{errors.country.message}</span>
        )}
      </div>
      <div>
        <Label className="block mb-1 font-medium">Phone Number</Label>
        <Input
          {...register('phone')}
          type="tel"
          className="w-full"
          disabled={isLoading}
          placeholder="e.g. 5551234567"
        />
        {errors.phone && (
          <span className="text-red-500 text-xs">{errors.phone.message}</span>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Sending OTP...' : 'Send OTP'}
      </Button>
    </form>
  );
};

export default SignInForm;
