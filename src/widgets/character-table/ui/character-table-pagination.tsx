import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui/pagination';

interface ICharacterTableSearchProps {
  count: number;
  page: number;
  handleBack: () => void;
  handleNext: () => void;
  handlePage: (page: number) => void;
}

export const CharacterTablePagination: React.FC<ICharacterTableSearchProps> = ({
  count,
  page,
  handleBack,
  handleNext,
  handlePage,
}) => {
  const pages = Math.ceil(count / 10);

  if (pages === 1) return null;

  return (
    <Pagination className="m-0 w-fit">
      <PaginationContent>
        {page > 1 && (
          <PaginationItem onClick={handleBack}>
            <PaginationPrevious href="#" />
          </PaginationItem>
        )}
        {page > 1 && (
          <PaginationItem onClick={() => handlePage(page - 1)}>
            <PaginationLink href="#">{page - 1}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive href="#">
            {page}
          </PaginationLink>
        </PaginationItem>
        {page < pages && (
          <PaginationItem onClick={() => handlePage(page + 1)}>
            <PaginationLink href="#">{page + 1}</PaginationLink>
          </PaginationItem>
        )}
        {page !== pages && (
          <PaginationItem onClick={handleNext}>
            <PaginationNext href="#" />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
