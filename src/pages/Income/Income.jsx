/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-no-undef */

import TextField from "@mui/material/TextField";
import { FaCloudUploadAlt, FaFileInvoice } from "react-icons/fa";
import {
  Autocomplete,
  Chip,
  Grid,
  styled,
  TextareaAutosize,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { incomeCategories } from "../../constant";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import uploadFile from "../../helper/uploadFile";
import { useCreateIncomeMutation } from "../../redux/api/income";
import { toast } from "react-toastify";
import { formatDate } from "../../utils/formateDate";
import { ErrorMessage } from "../../components/error-message";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddExpense = () => {
  const [value, setValue] = useState();
  const [url, setUrl] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [createIncome, { isLoading: createLoading, error: createError }] =
    useCreateIncomeMutation();

  const handleImageUpload = async (event) => {
    setLoading(true);
    const file = event.target.files?.[0];

    if (file) {
      const uploadPhoto = await uploadFile(file);
      setUrl(uploadPhoto?.secure_url);
      setLoading(false);
    }
  };
  const onSubmit = async (data) => {
    data.category = selectedCategories;
    data.date = formatDate(value);
    data.image = url;
    data.amount = Number(data.amount);

    try {
      const response = await createIncome(data).unwrap();
    
      if (response.success) {
        toast.success(response.message);
        navigate("/dashboard/income-list");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCategoryChange = (_, newValue) => {
    setSelectedCategories(newValue);
  };

  return (
    <section>
      <div className="addProductWraps">
        <div className="productHeadWrap">
          <div className="flex items-center md:justify-center ">
            <FaFileInvoice className="invoicIcon" />
            <div className="ml-2">
              <h3 className="md:text-2xl font-bold">Add Income </h3>
              <span className="text-sm">Dashboard / Income </span>
            </div>
          </div>
        </div>

        <div className="addProductWrap">
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            marginBottom="20px"
          >
            Add Income
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} xs={12} sm={6}>
                <Autocomplete
                  multiple
                  id="tags-filled"
                  options={incomeCategories.map((option) => option.title)}
                  sx={{ background: "white" }}
                  freeSolo
                  onChange={handleCategoryChange}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                      const { key, ...tagProps } = getTagProps({ index });
                      return (
                        <Chip
                          variant="outlined"
                          label={option}
                          key={key}
                          {...tagProps}
                        />
                      );
                    })
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Income Category" />
                  )}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12} sm={6}>
                <TextField
                  name="income"
                  label="Income Name"
                  fullWidth
                  {...register("income_name")}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12} sm={6}>
                <TextField
                  name="invoice"
                  label="Income Against Invoice "
                  fullWidth
                  {...register("invoice_number")}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    label="Select Date"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item lg={6} md={6} xs={12} sm={6}>
                <TextField
                  name="amount"
                  label="Amount"
                  fullWidth
                  {...register("amount")}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12} sm={6}>
                <div className="productField">
                  <input
                    onChange={handleImageUpload}
                    type="file"
                    id="files"
                    className="hidden"
                  />

                  <label
                    for="files"
                    className="text-sm flex items-center justify-center cursor-pointer bg-[#42A1DA] text-white py-2 rounded-md "
                  >
                    <span>
                      <FaCloudUploadAlt size={30} className="mr-2" />
                    </span>
                    {loading ? (
                      <span>Uploading...</span>
                    ) : (
                      <>
                        {url ? (
                          <span>Uploaded</span>
                        ) : (
                          <span> Attach Document</span>
                        )}
                      </>
                    )}
                  </label>
                </div>
              </Grid>
              <Grid item lg={12} md={6} xs={12} sm={6}>
                <TextareaAutosize
                  minRows={3}
                  style={{
                    padding: "4px",
                    border: "1px solid #ddd",
                    width: "100%",
                    borderRadius: "3px",
                  }}
                  name="assignment"
                  placeholder="Description"
                  {...register("description")}
                />
              </Grid>
              <div className="flex justify-end w-full mt-10 ">
                <button
                  disabled={loading || createLoading}
                  className="bg-[#42A1DA] text-white px-5 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </Grid>
          </form>
          <div className="my-2">
            {createError && (
              <ErrorMessage messages={createError?.data?.errorSources} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddExpense;
