import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Marketing from '@/app/(marketing)/page'

describe('Marketing', () => {
    it('should render', () => {
        render(<Marketing />)
        expect(screen.getByText('NextJS Supabase Starter')).toBeInTheDocument()
    })
})