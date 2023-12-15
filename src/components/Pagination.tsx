import { ReactNode } from "react"
import { LeftArrowIcon, RightArrowIcon } from "./icons"


type ButtonProps = {
  label: string
  active: boolean
  handleOnClick: (id: number) => void
}

const Button = ({ label, active, handleOnClick }: ButtonProps) => (
  <button
    style={styles.btn}
    disabled={active}
    className={`${active ? "bg-emerald-300 hover:bg-emerald-300" : "bg-gray-200 hover:bg-gray-300"} text-zinc-900`}
    onClick={() => {
      if (active) {
        return false
      }
      handleOnClick(Number(label))
    }}
  >
    {label}
  </button>
)

type EdgeButtonProps = {
  children: ReactNode
  disabled: boolean
  direction: 'next' | 'previous'
  handleOnClick: (id: number) => void
}
const EdgeButton = ({ children, disabled, direction, handleOnClick }: EdgeButtonProps) => (
  <button
    style={styles.btn}
    disabled={disabled}
    className={`${disabled ? "bg-gray-100 text-zinc-300 cursor-default" : "bg-gray-200 text-zinc-800 hover:bg-gray-300 cursor-pointer"}`}
    onClick={() => handleOnClick(direction === 'previous' ? -1 : 0)}
  >
    {children}
  </button>
)

type PaginationProps = {
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  labels: number[]
  handlePageClick: (id: number) => void
}

const Pagination = ({
  hasNextPage,
  hasPreviousPage,
  page,
  labels,
  handlePageClick,
}: PaginationProps) => {
  return (
    <nav className="py-6 flex gap-4">
      <EdgeButton disabled={!hasPreviousPage} direction="previous" handleOnClick={handlePageClick}>
        <LeftArrowIcon />
      </EdgeButton>
      {
        labels.map((label: number) =>
          <Button
            key={crypto.randomUUID()}
            active={label == page}
            label={String(label)}
            handleOnClick={handlePageClick}
          />
        )
      }
      <EdgeButton disabled={!hasNextPage} direction="next" handleOnClick={handlePageClick}>
        <RightArrowIcon />
      </EdgeButton>
    </nav>
  )
}

const styles = {
  btn: {
    width: '42px',
    height: '42px',
    borderRadius: '6px',
    fontSize: '18px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}

export default Pagination