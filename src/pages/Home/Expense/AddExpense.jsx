/* eslint-disable react/jsx-no-undef */

import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { FaFileInvoice, FaEye, FaReddit, FaTrashAlt, FaArrowRight, FaArrowLeft } from 'react-icons/fa'

import { Link } from 'react-router-dom'
import img from "../../../../public/assets/service2.png";
const AddExpense = () => {


	return (
		<section>
			<div className=" addProductWraps">
			
			<div className="productHeadWrap">
				<div className="flex items-center justify-center ">
					<FaFileInvoice className="invoicIcon" />
					<div className="ml-2">
						<h3 className="text-2xl font-bold">Add Expense </h3>
						<span>Dashboard / Expense </span>
					</div>
				</div>
				
			</div>
			
			<div className="addProductWrap">
				<form>
				
					<div className="productFieldWrap">
					
						<FormControl className="productField">
							<InputLabel htmlFor="grouped-native-select">Expense Category </InputLabel>
							<Select native defaultValue="" id="grouped-native-select" label="Select Category ">
								<option aria-label="None" value="" />
								<option value="First Category "> First Category </option>
								<option value="First Category "> First Category </option>
								<option value="First Category "> First Category </option>
								<option value="First Category "> First Category </option>
								<option value="First Category "> First Category </option>
							</Select>
						</FormControl>
            <FormControl className="productField">
            <InputLabel htmlFor="grouped-native-select"> Sub Category </InputLabel>
            <Select native defaultValue="" id="grouped-native-select" label="Select Category ">
              <option aria-label="None" value="" />
              <option value="First Category "> First Category </option>
              <option value="First Category "> First Category </option>
              <option value="First Category "> First Category </option>
              <option value="First Category "> First Category </option>
              <option value="First Category "> First Category </option>
            </Select>
          </FormControl>
					</div>
          <div className="productFieldWrap">
          <TextField className="productField" fullWidth label="Expense Name"/>
          <TextField className="productField" fullWidth label="Reference No "/>
        </div>
					
					<div className="productFieldWrap">
						<TextField className="productField" fullWidth label="Tax" id="Tax" />
						<TextField className="productField" fullWidth label="Date" id="Tax" />
					</div>
					
					<div className="productFieldWrap">
						<TextField className="productField" fullWidth label=" Location" id="Expense For" />
						<TextField className="productField" fullWidth label="Total Amount " id="Global Markup" />
					</div>
					<div className="productFieldWrap">
						<TextField
							className="productField"
							fullWidth
							label="Individual Markup"
							id="Individual Markup "
						/>
						<TextField className="productField" fullWidth label="Note" id="Note" />
					</div>
					
					<div className="mt-4 productDetailWrap">
						<textarea
							placeholder="Expense Note "
							className="productDetail"
							name=""
							id=""
							cols="30"
							rows="10"
						/>
					</div>
					<div className="mt-2 savebtn">
						<button>Add Expense </button>
					</div>
				</form>
			</div>
		</div>
		<div className="w-full mt-5 mb-24">
      
      <div className="flex items-center justify-between mb-5">
			<h3 className="text-3xl font-bold text-center "> Expense List: </h3>
      
        
      </div>
      <div className="overflow-x-auto ">
        <table className="table ">
          <thead className='tableWrap'>
            <tr>
              <th>SL</th>
              <th>Image</th>
              <th>Product Name </th>
              <th>Product Model </th>
              <th>Supplier Name </th>
              <th>Price </th>
              <th>Supplier Price  </th>
              <th colSpan={3}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td>
                <div className="mask   h-[100px] w-[100px] mx-auto ">
                  <img
                    className="object-cover w-full h-full text-center "
                    src={img}
                    alt="img"
                  />
                </div>
              </td>
              <td>Car  </td>
              <td>BMW2343</td>
              <td>Aminul Hoque </td>
              <td>BDT405</td>
              <td>BDT1005</td>
              <td >
                <div className='editIconWrap edit'>
				<FaEye className='editIcon' />
                </div>
              </td>
              <td >
                <div className='editIconWrap edit'>
                  <Link to='/dashboard/update-product'>
                    <FaReddit className='editIcon' />
                  </Link>
                </div>
              </td>
              <td>
                <div className='editIconWrap'>
                  <FaTrashAlt className='deleteIcon' />
                </div>

              </td>
            </tr>

          </tbody>
        </table>
      </div>
      <div className='pagination'>
        <div className='paginationBtn'>
          <button>
            <FaArrowLeft className='arrowLeft' />
          </button>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>
            <FaArrowRight className='arrowRight' />

          </button>
        </div>
      </div>
    </div>
		</section>
	)
}

export default AddExpense
