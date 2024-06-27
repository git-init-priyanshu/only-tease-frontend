import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Image from 'next/image';
import * as React from 'react';

import useNFTSubscription from '@/hooks/contracts/useBuyNftSubscription';
import useGetListedSubscriptions from '@/hooks/user/useGetListedSubscriptions';

import BuyModal from '@/components/ui/BuyModal';

import { allModelData } from '@/utils/modelData';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: '#130D1A',
  },
  [`&.${tableCellClasses.body}`]: {
    color: '#130D1A',
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({}));

export default function CustomizedTables() {
  const { data } = useGetListedSubscriptions()
  const [progress, setProgress] = React.useState(0);

  const [selectActiveData, setSelectActiveData] = React.useState<any>({
    id: '',
    tokenId: '',
    price: '',
    listingId: '',
    icon: '',
    name: '',
    listingPrice: '',
  });
  const [isOpen, setIsOpen] = React.useState(false);

  const { txHash, buyNFT } = useNFTSubscription(
    {
      amount: selectActiveData.price.toString(),
      listingId: selectActiveData.listingId,
      tokenId: selectActiveData.tokenId,
      onSuccess() {
        console.log("")
      },
    }

  )
  return (
    <TableContainer
      component={Paper}
      style={{
        borderRadius: "10px",
        border: "2px solid #FA78FF "
      }}
      className='w-[1100px]  bg-white text-white border-fuchsia-700 border'
    >
      {' '}
      {selectActiveData.icon !== '' && (
        <BuyModal
          txHash={txHash}
          progress={progress}
          listingPrice={selectActiveData.listingPrice}
          icon={selectActiveData.icon}
          isOpen={isOpen}
          onClick={() => {
            buyNFT();
          }}
          onClose={() => {
            setIsOpen(false);
            setProgress(0);
            setSelectActiveData({
              icon: '',
              id: '',
              listingPrice: '',
              name: '',
              price: '',
              tokenId: '',
            });
          }}
          name={selectActiveData.name}
        />
      )}
      <Table
        sx={{ minWidth: 100, border: 'none' }}
        aria-label='customized table'
      >
        <TableHead>
          <TableRow className=''>
            <StyledTableCell align='left'>#</StyledTableCell>
            <StyledTableCell align='left'>Collection</StyledTableCell>
            <StyledTableCell align='right'>Floor</StyledTableCell>
            <StyledTableCell align='right'>Floor&nbsp;1d</StyledTableCell>
            <StyledTableCell align='right'>Volume</StyledTableCell>
            <StyledTableCell align='right'>Top Offer</StyledTableCell>
            <StyledTableCell align='right'>Sales</StyledTableCell>
            <StyledTableCell align='right'>Listed</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.length > 0 && data.map((row: any) => {
            const modelData = allModelData.filter(
              (item) => item.id.toString() === row.model.modelId
            )[0];

            if (!modelData) return null;
            return (
              <StyledTableRow key={modelData.id}>
                <StyledTableCell component='th' scope='row'>
                  <Image
                    src={modelData.icon}
                    className='w-10 h-10 rounded-full'
                    alt='modelIcon'
                  />
                </StyledTableCell>
                <StyledTableCell component='th' scope='row'>
                  <div className='flex items-center  gap-2 '>
                    {modelData.name}
                    <svg
                      onClick={() => {
                        setIsOpen(true);
                        setSelectActiveData({
                          id: modelData.id.toString(),
                          tokenId: row.tokenId,
                          price: row.price,
                          listingId: row.listingId,
                          icon: modelData.icon,
                          name: modelData.name,
                          listingPrice: row.price,
                        });
                      }}
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className={`${'cursor-pointer'}' hover:text-fuchsia-600 w-5 h-5'`}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                      />
                    </svg>
                  </div>
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {parseInt(row.price)}
                  <span>&nbsp;USDC</span>
                </StyledTableCell>
                <StyledTableCell align='right'>
                  <span className='text-green-500 items-center flex  justify-end gap-1'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-4 h-4'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941'
                      />
                    </svg>
                    {/* {row.floor1d} % */}
                    "---"
                  </span>
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {modelData.views}
                  <span>K</span>
                </StyledTableCell>
                <StyledTableCell align='right'>
                  {parseInt(row.price) - 0.2} USDC
                </StyledTableCell>
                <StyledTableCell align='right'>--</StyledTableCell>
                <StyledTableCell align='right'>100%</StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* <div onClick={handleBuyNft}>Buy</div> */}
    </TableContainer>
  );
}
