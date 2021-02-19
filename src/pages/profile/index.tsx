import { login, isAuthenticated, getProfile, logout, updateProfile, getToken } from "../../utils/auth"
import React from 'react'
import auth0 from "auth0-js"
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Layout from '../../components/layout2'
import SEO from '../../components/SEO'


import {
  DialogContent,
  Grid,
  Typography,
  Box,
  Fade,
  CircularProgress,
  Badge,
  Avatar,
  Fab,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Hidden,
  TextField,
  Tooltip,
  IconButton,
  Divider,
} from "@material-ui/core";

import {
  Close as CloseIcon,
  Photo as PhotoIcon,
  CloudUpload as CloudUploadIcon,
  Person as PersonIcon,
  Edit as EditIcon,
  PersonOutline as PersonOutlineIcon,
  Email as EmailIcon,
  Warning as WarningIcon,
  Check as CheckIcon,
  AccessTime as AccessTimeIcon,
  DeleteForever as DeleteForeverIcon,
} from "@material-ui/icons";

const styles = (theme) => ({
  dialogContent: {
    paddingTop: theme.spacing(2),
  },

  badge: {
    top: theme.spacing(2),
    right: -theme.spacing(2),
  },

  loadingBadge: {
    top: "50%",
    right: "50%",
  },

  avatar: {
    marginRight: "auto",
    marginLeft: "auto",

    width: theme.spacing(14),
    height: theme.spacing(14),
  },

  nameInitials: {
    cursor: "default",
  },

  personIcon: {
    fontSize: theme.spacing(7),
  },

  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),

    minHeight: "initial",
  },
})

const initialState = {
  profileCompletion: 0,
  securityRating: 0,
  showingField: "",
  avatar: null,
  avatarUrl: "",
  firstName: "",
  lastName: "",
  username: "",
  emailAddress: "",
  country: "",
  parent_name: "",
  parent_no: "",
  parent_email: "",
  preferred_contact: "",
  alt_contact: "",
  age: "",
  grade: "",
  gender: "",
  special_needs: "",
  student_email: "",
  preferred_time: "",
  focus_area: "",
  focus_area2: "",
  performingAction: false,
  emailVerified: false,
  loadingAvatar: false,
  sentVerificationEmail: false,
  errors: null,
};

let user = null;
let email = "";
let tokens = null;
let auth0Manage = null;
let userId = "";

class Account extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        profileCompletion: 0,
      securityRating: 0,
      showingField: "",
      avatar: null,
      avatarUrl: "",
      firstName: "",
      lastName: "",
      username: "",
      emailAddress: "",
      country: "",
      parent_name: "",
      studentName: "",
      parent_no: "",
      parent_email: "",
      preferred_contact: "",
      alt_contact: "",
      age: "",
      grade: "",
      gender: "",
      special_needs: "",
      student_email: "",
      preferred_days: "",
      preferred_time: "",
      focus_area: "",
      focus_area2: "",
      performingAction: false,
      emailVerified: false,
      loadingAvatar: false,
      sentVerificationEmail: false,
      errors: null,
      pc: props.pageContext,
      labelName: "Student Name",
      labelUser: "Username",
      labelEmail: "E-Mail Address",
      labelSignIn: "Signed In",
      labelLogout: "Logout",
      labelLogoutAcc: "Logout of this account",
      labelCountry: "Country",
      labelPName: "Parent Name",
      labelPNo: "Parent Number",
      labelPemail: "Parent Email",
      labelPrefCont: "Preferred way of contact (phone or email)",
      labelAltCont: "Alternative contact and email",
      labelAge: "Student Age",
      labelGrade: "Student Grade",
      labelGender: "Student Gender",
      labelSpecNeeds: "Does your student have any special education needs that we should consider? If yes, what are their needs?",
      labelStudEmail: "Student Email (if over 18 years of age)",
      labelPrefDays: "Preferred class days of the week for our monthly package",
      labelPrefTime: "Preferred class time of the day, EST Boston/New York city",
      labelAdd: "Add",
      labelChange: labelChange,
      langCn: false,
      langUs: true

    };

  }

  getNameInitialsOrIcon = () => {

    if (!user) {
      return null;
    }

    const {classes} = this.props

    // if (!userData) {
    //   return <PersonIcon className={classes.personIcon} />;
    // }

    const nameInitials = user.student_name.charAt(0)

    if (nameInitials) {
      return (
        <Typography className={classes.nameInitials} variant="h2">
          {nameInitials}
        </Typography>
      );
    }

    return <PersonIcon className={classes.personIcon} />;
  };

  showField = (fieldId) => {
    if (!fieldId) {
      return;
    }

    this.setState({
      showingField: fieldId,
    });
  };

  logout = () => {
    if (Object.entries(this.state.pc).length == 0) {
      logout("us")
    }
    else {
      logout("cn")
    }

  }

  hideFields = (callback) => {
    this.setState(
      {
        showingField: "",
        firstName: "",
        lastName: "",
        username: "",
        emailAddress: "",
        country: "",
        parent_name: "",
        parent_no: "",
        parent_email: "",
        preferred_contact: "",
        alt_contact: "",
        studentName: "",
        age: "",
        grade: "",
        gender: "",
        special_needs: "",
        student_email: "",
        preferred_days: "",
        preferred_time: "",
        focus_area: "",
        focus_area2: "",
        errors: null,
      },
      () => {
        if (callback && typeof callback === "function") {
          callback();
        }
      }
    );
  };

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
}


  changeFirstName = async () => {
   const { firstName } = this.state;
   if (firstName === user.student_name) {
          return;
   }
   else {
     await this.setStateAsync({ performingAction: true });
     let newObj = {"student_name": firstName}
     updateProfile(userId, newObj)
     .then((res) => {
       user = res.user_metadata
       this.setState({performingAction: false})
     })
   }
  };


//  changeLastName = () => {
//   const { lastName } = this.state;
//
//   this.setState(
//     {
//       errors: null,
//     },
//     () => {
//
//       if (lastName === user.student_name.split(" ")[1]) {
//         return;
//       }
//
//       this.setState(
//         {
//           performingAction: true,
//         }
//       );
//     }
//   );
// };

changeUsername = async () => {
 const { username } = this.state;

  if (username === user.student_name) {
       return;
     }
     else {
       await this.setStateAsync({ performingAction: true });
       let newObj = {"username": username}
       updateProfile(userId, newObj)
       .then((res) => {
         user = res.user_metadata
         this.setState({performingAction: false})
       })
     }
};

changeEmailAddress = async () => {
 const { email } = this.state;

     if (email === email) {
       return;
     }
     else {
       await this.setStateAsync({ performingAction: true });
       let newObj = {"email": email}
       updateProfile(userId, newObj)
       .then((res) => {
         user = res.user_metadata
         this.setState({performingAction: false})
       })
     }
};

changeCountry = async () => {
 const { country } = this.state;

 if (country === user.country) {
        return;
 }
 else {
   await this.setStateAsync({ performingAction: true });
   let newObj = {"country": country}
   updateProfile(userId, newObj)
   .then((res) => {
     user = res.user_metadata
     this.setState({performingAction: false})
   })
 }
};

changeParentName = async () => {
 const { parent_name } = this.state;


     if (parent_name === user.parent_name) {
       return;
     }
     else {
       await this.setStateAsync({ performingAction: true });
       let newObj = {"parent_name": parent_name}
       updateProfile(userId, newObj)
       .then((res) => {
         user = res.user_metadata
         this.setState({performingAction: false})
       })
     }
};

changeParentNo = async () => {
 const { parent_no } = this.state;

     if (parent_no === user.parent_no) {
       return;
     }
     else {
       await this.setStateAsync({ performingAction: true });
       let newObj = {"parent_no": parent_no}
       updateProfile(userId, newObj)
       .then((res) => {
         user = res.user_metadata
         this.setState({performingAction: false})
       })
     }
};

changeParentEmail = async () => {
 const { parent_email } = this.state;

     if (parent_email === user.parent_email) {
       return;
     }
     else {
       await this.setStateAsync({ performingAction: true });
       let newObj = {"parent_email": parent_email}
       updateProfile(userId, newObj)
       .then((res) => {
         user = res.user_metadata
         this.setState({performingAction: false})
       })
     }
};

changePreferredContact = async () => {
 const { preferred_contact } = this.state;

     if (preferred_contact === user.preferred_contact) {
       return;
     }
     else {
       await this.setStateAsync({ performingAction: true });
       let newObj = {"preferred_contact": preferred_contact}
       updateProfile(userId, newObj)
       .then((res) => {
         user = res.user_metadata
         this.setState({performingAction: false})
       })
     }
};

changeAltContact = async () => {
 const { alt_contact } = this.state;

     if (alt_contact === user.alt_contact) {
       return;
     }
     else {
       await this.setStateAsync({ performingAction: true });
       let newObj = {"alt_contact": alt_contact}
       updateProfile(userId, newObj)
       .then((res) => {
         user = res.user_metadata
         this.setState({performingAction: false})
       })
     }
};

changeAge = async () => {
 const { age } = this.state;

     if (age === user.age) {
       return;
     }
     else {
       await this.setStateAsync({ performingAction: true });
       let newObj = {"age": age}
       updateProfile(userId, newObj)
       .then((res) => {
         user = res.user_metadata
         this.setState({performingAction: false})
       })
     }
};

changeGrade = async () => {
 const { grade } = this.state;

     if (grade === user.grade) {
       return;
     }
     else {
       await this.setStateAsync({ performingAction: true });
       let newObj = {"grade": grade}
       updateProfile(userId, newObj)
       .then((res) => {
         user = res.user_metadata
         this.setState({performingAction: false})
       })
     }
};

changeGender = async () => {
 const { gender } = this.state;

     if (gender === user.gender) {
       return;
     }

     else {
       await this.setStateAsync({ performingAction: true });
       let newObj = {"gender": gender}
       updateProfile(userId, newObj)
       .then((res) => {
         user = res.user_metadata
         this.setState({performingAction: false})
       })
     }
};

changeSpecialNeeds = async () => {
 const { special_needs } = this.state;

     if (special_needs === user.special_needs) {
       return;
     }
     else {
       await this.setStateAsync({ performingAction: true });
       let newObj = {"special_needs": special_needs}
       updateProfile(userId, newObj)
       .then((res) => {
         user = res.user_metadata
         this.setState({performingAction: false})
       })
     }
};

changeStudentEmail = async () => {
 const { student_email } = this.state;

     if (student_email === user.student_email) {
       return;
     }
     else {
       await this.setStateAsync({ performingAction: true });
       let newObj = {"student_email": student_email}
       updateProfile(userId, newObj)
       .then((res) => {
         user = res.user_metadata
         this.setState({performingAction: false})
       })
     }
};

changePreferredDays = async () => {
 const { preferred_days } = this.state;

     if (preferred_days === user.preferred_days) {
       return;
     }
     else {
       await this.setStateAsync({ performingAction: true });
       let newObj = {"preferred_days": preferred_days}
       updateProfile(userId, newObj)
       .then((res) => {
         user = res.user_metadata
         this.setState({performingAction: false})
       })
     }
};

changePreferredTime = async () => {
 const { preferred_time } = this.state;

     if (preferred_time === user.preferred_time) {
       return;
     }
     else {
       await this.setStateAsync({ performingAction: true });
       let newObj = {"preferred_time": preferred_time}
       updateProfile(userId, newObj)
       .then((res) => {
         user = res.user_metadata
         this.setState({performingAction: false})
       })
     }
};

changeFocusArea = async () => {
 const { focus_area } = this.state;

     if (focus_area === user.focus_area) {
       return;
     }
     else {
       await this.setStateAsync({ performingAction: true });
       let newObj = {"focus_area": focus_area}
       updateProfile(userId, newObj)
       .then((res) => {
         user = res.user_metadata
         this.setState({performingAction: false})
       })
     }
};

changeFocusArea2 = async () => {
 const { focus_area2 } = this.state;

     if (focus_area2 === user.focus_area2) {
       return;
     }
     else {
       await this.setStateAsync({ performingAction: true });
       let newObj = {"focus_area2": focus_area2}
       updateProfile(userId, newObj)
       .then((res) => {
         user = res.user_metadata
         this.setState({performingAction: false})
       })
     }
};

changeField = (fieldId) => {
    switch (fieldId) {
      case "first-name":
        this.changeFirstName();
        return;

      case "last-name":
        this.changeLastName();
        return;

      case "username":
        this.changeUsername();
        return;

      case "email-address":
        this.changeEmailAddress();
        return;

      case "country":
        this.changeCountry();
        return;

      case "parent-name":
        this.changeParentName();
        return;

      case "parent-no":
        this.changeParentNo();
        return;

      case "parent-email":
        this.changeParentEmail();
        return;

      case "preferred-contact":
        this.changePreferredContact();
        return;

      case "alt-contact":
        this.changeAltContact();
        return;

      case "age":
        this.changeAge();
        return;

      case "grade":
        this.changeGrade();
        return;

      case "gender":
        this.changeGender();
        return;

      case "special-needs":
        this.changeSpecialNeeds();
        return;

      case "student-email":
        this.changeStudentEmail();
        return;

      case "preferred-days":
        this.changePreferredDays();
        return;

      case "preferred-time":
        this.changePreferredTime();
        return;

      case "focus-area":
        this.changeFocusArea();
        return;

      case "focus_area2":
        this.changeFocusArea2();
        return;

      default:
        return;
    }
  };

  handleKeyDown = (event, fieldId) => {
    if (!event || !fieldId) {
      return;
    }

    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    const key = event.key;

    if (!key) {
      return;
    }

    if (key === "Escape") {
      this.hideFields();
    } else if (key === "Enter") {
      this.changeField(fieldId);
    }
  };

  handleAvatarChange = (event) => {
      if (!event) {
        return;
      }

      const files = event.target.files;

      if (!files) {
        return;
      }

      const avatar = files[0];

      if (!avatar) {
        return;
      }

      const fileTypes = [
        "image/gif",
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/svg+xml",
      ];

      if (!fileTypes.includes(avatar.type)) {
        return;
      }

      if (avatar.size > 20 * 1024 * 1024) {
        return;
      }

      this.setState({
        avatar: avatar,
        avatarUrl: URL.createObjectURL(avatar),
      });
    };

    handleFirstNameChange = (event) => {
    if (!event) {
      return;
    }

    const firstName = event.target.value;

    this.setState({
      firstName: firstName,
    });
  };

  handleLastNameChange = (event) => {
    if (!event) {
      return;
    }

    const lastName = event.target.value;

    this.setState({
      lastName: lastName,
    });
  };

  handleUsernameChange = (event) => {
    if (!event) {
      return;
    }

    const username = event.target.value;

    this.setState({
      username: username,
    });
  };

  handleEmailAddressChange = (event) => {
    if (!event) {
      return;
    }

    const emailAddress = event.target.value;

    this.setState({
      emailAddress: emailAddress,
    });
  };

  handleCountryChange = (event) => {
    if (!event) {
      return;
    }

    const country = event.target.value;

    this.setState({
      country: country,
    });
  };

  handleParentNameChange = (event) => {
    if (!event) {
      return;
    }

    const parent_name = event.target.value;

    this.setState({
      parent_name: parent_name,
    });
  };

  handleParentNoChange = (event) => {
    if (!event) {
      return;
    }

    const parent_no = event.target.value;

    this.setState({
      parent_no: parent_no,
    });
  };

  handleParentEmailChange = (event) => {
    if (!event) {
      return;
    }

    const parent_email = event.target.value;

    this.setState({
      parent_email: parent_email,
    });
  };


  handlePreferredContactChange = (event) => {
    if (!event) {
      return;
    }

    const preferred_contact = event.target.value;

    this.setState({
      preferred_contact: preferred_contact,
    });
  };

  handleAltContactChange = (event) => {
    if (!event) {
      return;
    }

    const alt_contact = event.target.value;

    this.setState({
      alt_contact: alt_contact,
    });
  };

  handleAgeChange = (event) => {
    if (!event) {
      return;
    }

    const age = event.target.value;

    this.setState({
      age: age,
    });
  };

  handleGradeChange = (event) => {
    if (!event) {
      return;
    }

    const grade = event.target.value;

    this.setState({
      grade: grade,
    });
  };

  handleGenderChange = (event) => {
    if (!event) {
      return;
    }

    const gender = event.target.value;

    this.setState({
      gender: gender,
    });
  };

  handleSpecialNeedsChange = (event) => {
    if (!event) {
      return;
    }

    const special_needs = event.target.value;

    this.setState({
      special_needs: special_needs,
    });
  };

  handleStudentEmailChange = (event) => {
    if (!event) {
      return;
    }

    const student_email = event.target.value;

    this.setState({
      student_email: student_email,
    });
  };

  handlePreferredDaysChange = (event) => {
    if (!event) {
      return;
    }

    const preferred_days = event.target.value;

    this.setState({
      preferred_days: preferred_days,
    });
  };

  handlePreferredTimeChange = (event) => {
    if (!event) {
      return;
    }

    const preferred_time = event.target.value;

    this.setState({
      preferred_time: preferred_time,
    });
  };

  handleFocusAreaChange = (event) => {
    if (!event) {
      return;
    }

    const focus_area = event.target.value;

    this.setState({
      focus_area: focus_area,
    });
  };

  handleFocusArea2Change = (event) => {
    if (!event) {
      return;
    }

    const focus_area2 = event.target.value;

    this.setState({
      focus_area2: focus_area2,
    });
  };

  componentDidMount = () => {
    if (Object.entries(this.state.pc).length != 0 && this.state.pc.lang == "cn") {
      this.setState({
      labelName: "学生英文名",
      labelUser: "学生中文姓名",
      labelEmail: "邮件地址",
      labelSignIn: "已登入",
      labelLogout: "退出",
      labelLogoutAcc: "退出本账号",
      labelCountry: "国家",
      labelPName: "家长姓名",
      labelPNo: "家长微信号",
      labelPemail: "家长电子邮件",
      labelPrefCont: "首选的联系方式 （微信或电子邮件）",
      labelAltCont: "备用联系人联系方式",
      labelAge: "学生年龄",
      labelGrade: "学生年级",
      labelGender: "学生性别",
      labelSpecNeeds: "学生英文水平（初级，中级，或高级）",
      labelStudEmail: "学生电子邮件（18岁以上学生）",
      labelPrefDays: "首选的上课日期（每周的哪几天）",
      labelPrefTime: "首选的上课时间（北京时间）",
      labelAdd: "输入添加",
      labelChange: "按回车键保存",
      langCn: true,
      langUs: false
    })
    }
    getProfile()
    .then((result) => {
      user = result
      email = user.email
      userId = user.sub
      tokens = getToken()
      console.log("Tokens AND ", tokens, user)
      auth0Manage = new auth0.Management({
        domain: "future-eng.us.auth0.com",
        token: tokens.accessToken
      });
      let pic = user.picture
      let veri = user.email_verified
      user = user['https://app.io/user_metadata']
      this.setState({avatarUrl: pic, emailAddress: email, emailVerified: veri})

    })


  }


  render() {
    const {classes} = this.props

    const {
      profileCompletion,
      securityRating,
      showingField,
      performingAction,
      loadingAvatar,
      avatar,
      avatarUrl,
      firstName,
      lastName,
      username,
      emailAddress,
      emailVerified,
      sentVerificationEmail,
      errors,
      country,
      parent_name,
      parent_no,
      parent_email,
      preferred_contact,
      alt_contact,
      age,
      grade,
      gender,
      special_needs,
      student_email,
      preferred_days,
      preferred_time,
      focus_area,
      focus_area2,
      labelName,
      labelUser,
      labelEmail,
      labelSignIn,
      labelLogout,
      labelLogoutAcc,
      labelCountry,
      labelPName,
      labelPNo,
      labelPemail,
      labelPrefCont,
      labelAltCont,
      labelAge,
      labelGrade,
      labelGender,
      labelSpecNeeds,
      labelStudEmail,
      labelPrefDays,
      labelPrefTime,
      labelAdd,
      labelChange,
      langCn,
      langUs
    } = this.state;
    console.log(user)
    const hasFirstName = user && user.student_name
    const hasUsername = user && user.student_name;
    const hasCountry = user && user.country;
    const hasParentName = user && user.parent_name;
    const hasParentNo = user && user.parent_no;
    const hasParentEmail = user && user.parent_email;
    const hasPreferredContact = user && user.preferred_contact;
    const hasAltContact = user && user.alt_contact;
    const hasAge = user && user.age;
    const hasGender = user && user.gender;
    const hasGrade = user && user.grade;
    const hasSpecialNeeds = user && user.special_needs;
    const hasStudentEmail = user && user.student_email;
    const hasPreferredDays = user && user.preferred_days;
    const hasPreferredTime = user && user.preferred_time;
    const hasFocusArea = user && user.focus_area;
    const hasFocusArea2 = user && user.focus_area2;

    return (
      <Layout color="#90BDDF">
        <SEO title="Profile | FEA" desc="This is Future English Academy" />
        <Box mb={2}>
         <Hidden xsDown>
           <Grid alignItems="center" container>
             <Grid item xs>
               <Box textAlign="center">
                 <Box mb={1.5}>
                   { avatarUrl && (
                     <Badge
                       classes={{ badge: classes.badge }}
                       badgeContent={
                         <Tooltip title="Remove">
                           <Fab
                             classes={{ sizeSmall: classes.small }}
                             color="secondary"
                             disabled={performingAction}
                             size="small"
                             onClick={this.removeAvatar}
                           >
                             <CloseIcon fontSize="small" />
                           </Fab>
                         </Tooltip>
                       }
                     >
                       {loadingAvatar && (
                         <Badge
                           classes={{ badge: classes.loadingBadge }}
                           badgeContent={
                             <Fade
                               style={{ transitionDelay: "1s" }}
                               in={loadingAvatar}
                               unmountOnExit
                             >
                               <CircularProgress size={120} thickness={1.8} />
                             </Fade>
                           }
                         >
                           <Avatar
                             className={classes.avatar}
                             alt="Avatar"
                             src={avatarUrl}
                           />
                         </Badge>
                       )}

                       {!loadingAvatar && (
                         <Avatar
                           className={classes.avatar}
                           alt="Avatar"
                           src={avatarUrl}
                         />
                       )}
                     </Badge>
                   )}

                   {!avatar && !avatarUrl && (
                     <>
                       {avatarUrl && (
                         <Badge
                           classes={{ badge: classes.badge }}
                           badgeContent={
                             <Tooltip title="Remove">
                               <Fab
                                 classes={{ sizeSmall: classes.small }}
                                 color="secondary"
                                 disabled={performingAction}
                                 size="small"
                                 onClick={this.removeAvatar}
                               >
                                 <CloseIcon fontSize="small" />
                               </Fab>
                             </Tooltip>
                           }
                         >
                           {loadingAvatar && (
                             <Badge
                               classes={{ badge: classes.loadingBadge }}
                               badgeContent={
                                 <Fade
                                   style={{ transitionDelay: "1s" }}
                                   in={loadingAvatar}
                                   unmountOnExit
                                 >
                                   <CircularProgress
                                     size={120}
                                     thickness={1.8}
                                   />
                                 </Fade>
                               }
                             >
                               <Avatar
                                 className={classes.avatar}
                                 alt="Avatar"
                                 src={avatarUrl}
                               />
                             </Badge>
                           )}

                           {!loadingAvatar && (
                             <Avatar
                               className={classes.avatar}
                               alt="Avatar"
                               src={avatarUrl}
                             />
                           )}
                         </Badge>
                       )}

                       {!avatarUrl && (
                         <>
                           {loadingAvatar && (
                             <Badge
                               classes={{ badge: classes.loadingBadge }}
                               badgeContent={
                                 <Fade
                                   style={{ transitionDelay: "1s" }}
                                   in={loadingAvatar}
                                   unmountOnExit
                                 >
                                   <CircularProgress
                                     size={120}
                                     thickness={1.8}
                                   />
                                 </Fade>
                               }
                             >
                               <Avatar className={classes.avatar} alt="Avatar">
                                 {this.getNameInitialsOrIcon()}
                               </Avatar>
                             </Badge>
                           )}

                           {!loadingAvatar && (
                             <Avatar className={classes.avatar} alt="Avatar">
                               {this.getNameInitialsOrIcon()}
                             </Avatar>
                           )}
                         </>
                       )}
                     </>
                   )}
                 </Box>

                 {avatar && avatarUrl && (
                   <Button
                     color="primary"
                     disabled={performingAction}
                     startIcon={<CloudUploadIcon />}
                     variant="contained"
                     onClick={this.uploadAvatar}
                   >
                     Upload
                   </Button>
                 )}

                 {!avatar && !avatarUrl && (
                   <>
                     <input
                       id="avatar-input"
                       type="file"
                       hidden
                       accept="image/*"
                       onChange={this.handleAvatarChange}
                     />

                     <label htmlFor="avatar-input">
                       <Button
                         color="primary"
                         component="span"
                         disabled={performingAction}
                         startIcon={<PhotoIcon />}
                         variant="contained"
                       >
                         Choose...
                       </Button>
                     </label>
                   </>
                 )}
               </Box>
             </Grid>

             {/**<Grid item xs>
               <Box textAlign="center">
                 <Typography variant="body1">Profile completion</Typography>
                 {profileCompletion === 0 && (
                   <Typography color="error" variant="h5">
                     {profileCompletion}%
                   </Typography>
                 )}
                 {profileCompletion === 100 && (
                   <Typography color="primary" variant="h5">
                     {profileCompletion}%
                   </Typography>
                 )}
                 {profileCompletion !== 0 && profileCompletion !== 100 && (
                   <Typography color="secondary" variant="h5">
                     {profileCompletion}%
                   </Typography>
                 )}
               </Box>
             </Grid>*/}

             {/**<Grid item xs>
               <Box textAlign="center">
                 <Typography variant="body1">Security rating</Typography>
                 {securityRating === 0 && (
                   <Typography color="error" variant="h5">
                     {securityRating}%
                   </Typography>
                 )}
                 {securityRating === 100 && (
                   <Typography color="primary" variant="h5">
                     {securityRating}%
                   </Typography>
                 )}
                 {securityRating !== 0 && securityRating !== 100 && (
                   <Typography color="secondary" variant="h5">
                     {securityRating}%
                   </Typography>
                 )}
               </Box>
             </Grid>*/}
           </Grid>
         </Hidden>

         <Hidden smUp>
           <Box textAlign="center" mb={3}>
             <Box mb={1.5}>
               {avatar && avatarUrl && (
                 <Badge
                   classes={{ badge: classes.badge }}
                   badgeContent={
                     <Tooltip title="Remove">
                       <Fab
                         classes={{ sizeSmall: classes.small }}
                         color="secondary"
                         disabled={performingAction}
                         size="small"
                         onClick={this.removeAvatar}
                       >
                         <CloseIcon fontSize="small" />
                       </Fab>
                     </Tooltip>
                   }
                 >
                   {loadingAvatar && (
                     <Badge
                       classes={{ badge: classes.loadingBadge }}
                       badgeContent={
                         <Fade
                           style={{ transitionDelay: "1s" }}
                           in={loadingAvatar}
                           unmountOnExit
                         >
                           <CircularProgress size={120} thickness={1.8} />
                         </Fade>
                       }
                     >
                       <Avatar
                         className={classes.avatar}
                         alt="Avatar"
                         src={avatarUrl}
                       />
                     </Badge>
                   )}

                   {!loadingAvatar && (
                     <Avatar
                       className={classes.avatar}
                       alt="Avatar"
                       src={avatarUrl}
                     />
                   )}
                 </Badge>
               )}

               {!avatar && !avatarUrl && (
                 <>
                   {avatarUrl && (
                     <Badge
                       classes={{ badge: classes.badge }}
                       badgeContent={
                         <Tooltip title="Remove">
                           <Fab
                             classes={{ sizeSmall: classes.small }}
                             color="secondary"
                             disabled={performingAction}
                             size="small"
                             onClick={this.removeAvatar}
                           >
                             <CloseIcon fontSize="small" />
                           </Fab>
                         </Tooltip>
                       }
                     >
                       {loadingAvatar && (
                         <Badge
                           classes={{ badge: classes.loadingBadge }}
                           badgeContent={
                             <CircularProgress size={120} thickness={1.8} />
                           }
                         >
                           <Avatar
                             className={classes.avatar}
                             alt="Avatar"
                             src={avatarUrl}
                           />
                         </Badge>
                       )}

                       {!loadingAvatar && (
                         <Avatar
                           className={classes.avatar}
                           alt="Avatar"
                           src={avatarUrl}
                         />
                       )}
                     </Badge>
                   )}

                   {!avatarUrl && (
                     <>
                       {loadingAvatar && (
                         <Badge
                           classes={{ badge: classes.loadingBadge }}
                           badgeContent={
                             <Fade
                               style={{ transitionDelay: "1s" }}
                               in={loadingAvatar}
                               unmountOnExit
                             >
                               <CircularProgress size={120} thickness={1.8} />
                             </Fade>
                           }
                         >
                           <Avatar className={classes.avatar} alt="Avatar">
                             {this.getNameInitialsOrIcon()}
                           </Avatar>
                         </Badge>
                       )}

                       {!loadingAvatar && (
                         <Avatar className={classes.avatar} alt="Avatar">
                           {this.getNameInitialsOrIcon()}
                         </Avatar>
                       )}
                     </>
                   )}
                 </>
               )}
             </Box>

             {avatar && avatarUrl && (
               <Button
                 color="primary"
                 disabled={performingAction}
                 startIcon={<CloudUploadIcon />}
                 variant="contained"
                 onClick={this.uploadAvatar}
               >
                 Upload
               </Button>
             )}

             {!avatar && !avatarUrl && (
               <>
                 <input
                   id="avatar-input"
                   type="file"
                   hidden
                   accept="image/*"
                   onChange={this.handleAvatarChange}
                 />

                 <label htmlFor="avatar-input">
                   <Button
                     color="primary"
                     component="span"
                     disabled={performingAction}
                     startIcon={<PhotoIcon />}
                     variant="contained"
                   >
                     Choose...
                   </Button>
                 </label>
               </>
             )}
           </Box>

           <Grid container>
             <Grid item xs>
               <Box textAlign="center">
                 <Typography variant="body1">Profile completion</Typography>

                 {profileCompletion === 0 && (
                   <Typography color="error" variant="h5">
                     {profileCompletion}%
                   </Typography>
                 )}

                 {profileCompletion === 100 && (
                   <Typography color="primary" variant="h5">
                     {profileCompletion}%
                   </Typography>
                 )}

                 {profileCompletion !== 0 && profileCompletion !== 100 && (
                   <Typography color="secondary" variant="h5">
                     {profileCompletion}%
                   </Typography>
                 )}
               </Box>
             </Grid>

             <Grid item xs>
               <Box textAlign="center">
                 <Typography variant="body1">Security rating</Typography>

                 {securityRating === 0 && (
                   <Typography color="error" variant="h5">
                     {securityRating}%
                   </Typography>
                 )}

                 {securityRating === 100 && (
                   <Typography color="primary" variant="h5">
                     {securityRating}%
                   </Typography>
                 )}

                 {securityRating !== 0 && securityRating !== 100 && (
                   <Typography color="secondary" variant="h5">
                     {securityRating}%
                   </Typography>
                 )}
               </Box>
             </Grid>
           </Grid>
         </Hidden>
       </Box>

       <List disablePadding>
         <ListItem>
           <Hidden xsDown>
             <ListItemIcon>
               <PersonIcon />
             </ListItemIcon>
           </Hidden>

           {!hasFirstName && (
             <ListItemIcon>
               <Tooltip title="No name">
                 <WarningIcon color="error" />
               </Tooltip>
             </ListItemIcon>
           )}

           {showingField === "first-name" && (
             <TextField
               autoComplete="given-name"
               autoFocus
               disabled={performingAction}
               error={!!(errors && errors.firstName)}
               fullWidth
               helperText={
                 errors && errors.firstName
                   ? errors.firstName[0]
                   : labelChange
               }
               label={labelName}
               placeholder={hasFirstName && user.student_name}
               required
               type="text"
               value={firstName}
               variant="filled"
               InputLabelProps={{ required: false }}
               onBlur={this.hideFields}
               onKeyDown={(event) => this.handleKeyDown(event, "first-name")}
               onChange={this.handleFirstNameChange}
             />
           )}

           {showingField !== "first-name" && (
             <>
               <ListItemText
                 primary={labelName}
                 secondary={
                   hasFirstName
                     ? user.student_name
                     : "You don’t have a full name"
                 }
               />

               <ListItemSecondaryAction>
                 {hasFirstName && (
                   <Tooltip title="Change">
                     <div>
                       <IconButton
                         disabled={performingAction}
                         onClick={() => this.showField("first-name")}
                       >
                         <EditIcon />
                       </IconButton>
                     </div>
                   </Tooltip>
                 )}

                 {!hasFirstName && (
                   <Button
                     color="primary"
                     disabled={performingAction}
                     variant="contained"
                     onClick={() => this.showField("first-name")}
                   >
                     {labelAdd}
                   </Button>
                 )}
               </ListItemSecondaryAction>
             </>
           )}
         </ListItem>

         <ListItem>
           <Hidden xsDown>
             <ListItemIcon>
               <PersonIcon />
             </ListItemIcon>
           </Hidden>

           {!hasCountry && (
             <ListItemIcon>
               <Tooltip title="No country">
                 <WarningIcon color="error" />
               </Tooltip>
             </ListItemIcon>
           )}

           {showingField === "country" && (
             <TextField
               autoComplete="country"
               autoFocus
               disabled={performingAction}
               error={!!(errors && errors.country)}
               fullWidth
               helperText={
                 errors && errors.country
                   ? errors.country[0]
                   : labelChange
               }
               label={labelCountry}
               placeholder={hasCountry && user.country}
               required
               type="text"
               value={country}
               variant="filled"
               InputLabelProps={{ required: false }}
               onBlur={this.hideFields}
               onKeyDown={(event) => this.handleKeyDown(event, "country")}
               onChange={this.handleCountryChange}
             />
           )}

           {showingField !== "country" && (
             <>
               <ListItemText
                 primary={labelCountry}
                 secondary={
                   hasCountry
                     ? user.country
                     : "You don’t have a country set"
                 }
               />

               <ListItemSecondaryAction>
                 {hasCountry && (
                   <Tooltip title="Change">
                     <div>
                       <IconButton
                         disabled={performingAction}
                         onClick={() => this.showField("country")}
                       >
                         <EditIcon />
                       </IconButton>
                     </div>
                   </Tooltip>
                 )}

                 {!hasCountry && (
                   <Button
                     color="primary"
                     disabled={performingAction}
                     variant="contained"
                     onClick={() => this.showField("country")}
                   >
                     {labelAdd}
                   </Button>
                 )}
               </ListItemSecondaryAction>
             </>
           )}
         </ListItem>

         <ListItem>
           <Hidden xsDown>
             <ListItemIcon>
               <PersonIcon />
             </ListItemIcon>
           </Hidden>

           {!hasParentName && (
             <ListItemIcon>
               <Tooltip title="No Parent Name">
                 <WarningIcon color="error" />
               </Tooltip>
             </ListItemIcon>
           )}

           {showingField === "parent-name" && (
             <TextField
               autoComplete="parent name"
               autoFocus
               disabled={performingAction}
               error={!!(errors && errors.parent_name)}
               fullWidth
               helperText={
                 errors && errors.parent_name
                   ? errors.parent_name[0]
                   : labelChange
               }
               label={labelPName}
               placeholder={hasParentName && user.parent_name}
               required
               type="text"
               value={parent_name}
               variant="filled"
               InputLabelProps={{ required: false }}
               onBlur={this.hideFields}
               onKeyDown={(event) => this.handleKeyDown(event, "parent-name")}
               onChange={this.handleParentNameChange}
             />
           )}

           {showingField !== "parent-name" && (
             <>
               <ListItemText
                 primary={labelPName}
                 secondary={
                   hasParentName
                     ? user.parent_name
                     : "You don’t have a parent name set"
                 }
               />

               <ListItemSecondaryAction>
                 {hasParentName && (
                   <Tooltip title="Change">
                     <div>
                       <IconButton
                         disabled={performingAction}
                         onClick={() => this.showField("parent-name")}
                       >
                         <EditIcon />
                       </IconButton>
                     </div>
                   </Tooltip>
                 )}

                 {!hasParentName && (
                   <Button
                     color="primary"
                     disabled={performingAction}
                     variant="contained"
                     onClick={() => this.showField("parent-name")}
                   >
                     {labelAdd}
                   </Button>
                 )}
               </ListItemSecondaryAction>
             </>
           )}
         </ListItem>

         <ListItem>
           <Hidden xsDown>
             <ListItemIcon>
               <PersonIcon />
             </ListItemIcon>
           </Hidden>

           {!hasParentEmail && (
             <ListItemIcon>
               <Tooltip title="No parent email">
                 <WarningIcon color="error" />
               </Tooltip>
             </ListItemIcon>
           )}

           {showingField === "parent-email" && (
             <TextField
               autoComplete="parent email"
               autoFocus
               disabled={performingAction}
               error={!!(errors && errors.parent_email)}
               fullWidth
               helperText={
                 errors && errors.parent_email
                   ? errors.parent_email[0]
                   : labelChange
               }
               label={labelPemail}
               placeholder={hasParentEmail && user.parent_email}
               required
               type="text"
               value={parent_email}
               variant="filled"
               InputLabelProps={{ required: false }}
               onBlur={this.hideFields}
               onKeyDown={(event) => this.handleKeyDown(event, "parent-email")}
               onChange={this.handleParentEmailChange}
             />
           )}

           {showingField !== "parent-email" && (
             <>
               <ListItemText
                 primary={labelPemail}
                 secondary={
                   hasParentEmail
                     ? user.parent_email
                     : "You don’t have a parent email set"
                 }
               />

               <ListItemSecondaryAction>
                 {hasParentEmail && (
                   <Tooltip title="Change">
                     <div>
                       <IconButton
                         disabled={performingAction}
                         onClick={() => this.showField("parent-email")}
                       >
                         <EditIcon />
                       </IconButton>
                     </div>
                   </Tooltip>
                 )}

                 {!hasParentEmail && (
                   <Button
                     color="primary"
                     disabled={performingAction}
                     variant="contained"
                     onClick={() => this.showField("parent-email")}
                   >
                     {labelAdd}
                   </Button>
                 )}
               </ListItemSecondaryAction>
             </>
           )}
         </ListItem>

         <ListItem>
           <Hidden xsDown>
             <ListItemIcon>
               <PersonIcon />
             </ListItemIcon>
           </Hidden>

           {!hasParentNo && (
             <ListItemIcon>
               <Tooltip title="No parent number">
                 <WarningIcon color="error" />
               </Tooltip>
             </ListItemIcon>
           )}

           {showingField === "parent-no" && (
             <TextField
               autoComplete="parent number"
               autoFocus
               disabled={performingAction}
               error={!!(errors && errors.parent_no)}
               fullWidth
               helperText={
                 errors && errors.parent_no
                   ? errors.parent_no[0]
                   : labelChange
               }
               label={labelPNo}
               placeholder={hasParentNo && user.parent_no}
               required
               type="text"
               value={parent_no}
               variant="filled"
               InputLabelProps={{ required: false }}
               onBlur={this.hideFields}
               onKeyDown={(event) => this.handleKeyDown(event, "parent-no")}
               onChange={this.handleParentNoChange}
             />
           )}

           {showingField !== "parent-no" && (
             <>
               <ListItemText
                 primary={labelPNo}
                 secondary={
                   hasParentNo
                     ? user.parent_no
                     : "You don’t have a parent number set"
                 }
               />

               <ListItemSecondaryAction>
                 {hasParentNo && (
                   <Tooltip title="Change">
                     <div>
                       <IconButton
                         disabled={performingAction}
                         onClick={() => this.showField("parent-no")}
                       >
                         <EditIcon />
                       </IconButton>
                     </div>
                   </Tooltip>
                 )}

                 {!hasParentNo && (
                   <Button
                     color="primary"
                     disabled={performingAction}
                     variant="contained"
                     onClick={() => this.showField("parent-no")}
                   >
                     {labelAdd}
                   </Button>
                 )}
               </ListItemSecondaryAction>
             </>
           )}
         </ListItem>

         <ListItem>
           <Hidden xsDown>
             <ListItemIcon>
               <PersonIcon />
             </ListItemIcon>
           </Hidden>

           {!hasPreferredContact && (
             <ListItemIcon>
               <Tooltip title="No preferred contact">
                 <WarningIcon color="error" />
               </Tooltip>
             </ListItemIcon>
           )}

           {showingField === "preferred-contact" && (
             <TextField
               autoComplete="preferred_contact"
               autoFocus
               disabled={performingAction}
               error={!!(errors && errors.preferred_contact)}
               fullWidth
               helperText={
                 errors && errors.preferred_contact
                   ? errors.preferred_contact[0]
                   : labelChange
               }
               label={labelPrefCont}
               placeholder={hasPreferredContact && user.preferred_contact}
               required
               type="text"
               value={preferred_contact}
               variant="filled"
               InputLabelProps={{ required: false }}
               onBlur={this.hideFields}
               onKeyDown={(event) => this.handleKeyDown(event, "preferred-contact")}
               onChange={this.handlePreferredContactChange}
             />
           )}

           {showingField !== "preferred-contact" && (
             <>
               <ListItemText
                 primary={labelPrefCont}
                 secondary={
                   hasPreferredContact
                     ? user.preferred_contact
                     : "You don’t have a preferred contact set"
                 }
               />

               <ListItemSecondaryAction>
                 {hasPreferredContact && (
                   <Tooltip title="Change">
                     <div>
                       <IconButton
                         disabled={performingAction}
                         onClick={() => this.showField("preferred-contact")}
                       >
                         <EditIcon />
                       </IconButton>
                     </div>
                   </Tooltip>
                 )}

                 {!hasPreferredContact && (
                   <Button
                     color="primary"
                     disabled={performingAction}
                     variant="contained"
                     onClick={() => this.showField("preferred-contact")}
                   >
                     {labelAdd}
                   </Button>
                 )}
               </ListItemSecondaryAction>
             </>
           )}
         </ListItem>

         <ListItem>
           <Hidden xsDown>
             <ListItemIcon>
               <PersonIcon />
             </ListItemIcon>
           </Hidden>

           {!hasAltContact && (
             <ListItemIcon>
               <Tooltip title="No alternative contact">
                 <WarningIcon color="error" />
               </Tooltip>
             </ListItemIcon>
           )}

           {showingField === "alt-contact" && (
             <TextField
               autoComplete="alt contact"
               autoFocus
               disabled={performingAction}
               error={!!(errors && errors.alt_contact)}
               fullWidth
               helperText={
                 errors && errors.alt_contact
                   ? errors.alt_contact[0]
                   : labelChange
               }
               label={labelAltCont}
               placeholder={hasAltContact && user.alt_contact}
               required
               type="text"
               value={alt_contact}
               variant="filled"
               InputLabelProps={{ required: false }}
               onBlur={this.hideFields}
               onKeyDown={(event) => this.handleKeyDown(event, "alt-contact")}
               onChange={this.handleAltContactChange}
             />
           )}

           {showingField !== "alt-contact" && (
             <>
               <ListItemText
                 primary={labelAltCont}
                 secondary={
                   hasAltContact
                     ? user.alt_contact
                     : "You don’t have a alternative contact set"
                 }
               />

               <ListItemSecondaryAction>
                 {hasAltContact && (
                   <Tooltip title="Change">
                     <div>
                       <IconButton
                         disabled={performingAction}
                         onClick={() => this.showField("alt-contact")}
                       >
                         <EditIcon />
                       </IconButton>
                     </div>
                   </Tooltip>
                 )}

                 {!hasAltContact && (
                   <Button
                     color="primary"
                     disabled={performingAction}
                     variant="contained"
                     onClick={() => this.showField("alt-contact")}
                   >
                     {labelAdd}
                   </Button>
                 )}
               </ListItemSecondaryAction>
             </>
           )}
         </ListItem>

         <ListItem>
           <Hidden xsDown>
             <ListItemIcon>
               <PersonOutlineIcon />
             </ListItemIcon>
           </Hidden>

           {!hasUsername && (
             <ListItemIcon>
               <Tooltip title="No Student name">
                 <WarningIcon color="error" />
               </Tooltip>
             </ListItemIcon>
           )}

           {showingField === "username" && (
             <TextField
               autoComplete="username"
               autoFocus
               disabled={performingAction}
               error={!!(errors && errors.username)}
               fullWidth
               helperText={
                 errors && errors.username
                   ? errors.username[0]
                   : labelChange
               }
               label={labelUser}
               placeholder={hasUsername && user.student_name}
               required
               type="text"
               value={username}
               variant="filled"
               InputLabelProps={{ required: false }}
               onBlur={this.hideFields}
               onKeyDown={(event) => this.handleKeyDown(event, "username")}
               onChange={this.handleUsernameChange}
             />
           )}

           {showingField !== "username" && (
             <>
               <ListItemText
                 primary={labelUser}
                 secondary={
                   hasUsername
                     ? user.student_name
                     : "You don’t have a Student name"
                 }
               />

               <ListItemSecondaryAction>
                 {hasUsername && (
                   <Tooltip title="Change">
                     <div>
                       <IconButton
                         disabled={performingAction}
                         onClick={() => this.showField("username")}
                       >
                         {/**<EditIcon />*/}
                       </IconButton>
                     </div>
                   </Tooltip>
                 )}

                 {!hasUsername && (
                   <Button
                     color="primary"
                     disabled={performingAction}
                     variant="contained"
                     onClick={() => this.showField("username")}
                   >
                     {labelAdd}
                   </Button>
                 )}
               </ListItemSecondaryAction>
             </>
           )}
         </ListItem>

         <ListItem>
           <Hidden xsDown>
             <ListItemIcon>
               <PersonIcon />
             </ListItemIcon>
           </Hidden>

           {!hasAge && (
             <ListItemIcon>
               <Tooltip title="No age">
                 <WarningIcon color="error" />
               </Tooltip>
             </ListItemIcon>
           )}

           {showingField === "age" && (
             <TextField
               autoComplete="age"
               autoFocus
               disabled={performingAction}
               error={!!(errors && errors.age)}
               fullWidth
               helperText={
                 errors && errors.age
                   ? errors.age[0]
                   : labelChange
               }
               label={labelAge}
               placeholder={hasAge && user.age}
               required
               type="text"
               value={age}
               variant="filled"
               InputLabelProps={{ required: false }}
               onBlur={this.hideFields}
               onKeyDown={(event) => this.handleKeyDown(event, "age")}
               onChange={this.handleAgeChange}
             />
           )}

           {showingField !== "age" && (
             <>
               <ListItemText
                 primary={labelAge}
                 secondary={
                   hasAge
                     ? user.age
                     : "You don’t have a age set"
                 }
               />

               <ListItemSecondaryAction>
                 {hasAge && (
                   <Tooltip title="Change">
                     <div>
                       <IconButton
                         disabled={performingAction}
                         onClick={() => this.showField("age")}
                       >
                         <EditIcon />
                       </IconButton>
                     </div>
                   </Tooltip>
                 )}

                 {!hasAge && (
                   <Button
                     color="primary"
                     disabled={performingAction}
                     variant="contained"
                     onClick={() => this.showField("age")}
                   >
                     {labelAdd}
                   </Button>
                 )}
               </ListItemSecondaryAction>
             </>
           )}
         </ListItem>

         <ListItem>
           <Hidden xsDown>
             <ListItemIcon>
               <PersonIcon />
             </ListItemIcon>
           </Hidden>

           {!hasGrade && (
             <ListItemIcon>
               <Tooltip title="No grade">
                 <WarningIcon color="error" />
               </Tooltip>
             </ListItemIcon>
           )}

           {showingField === "grade" && (
             <TextField
               autoComplete="grade"
               autoFocus
               disabled={performingAction}
               error={!!(errors && errors.grade)}
               fullWidth
               helperText={
                 errors && errors.grade
                   ? errors.grade[0]
                   : labelChange
               }
               label={labelGrade}
               placeholder={hasGrade && user.grade}
               required
               type="text"
               value={grade}
               variant="filled"
               InputLabelProps={{ required: false }}
               onBlur={this.hideFields}
               onKeyDown={(event) => this.handleKeyDown(event, "grade")}
               onChange={this.handleGradeChange}
             />
           )}

           {showingField !== "grade" && (
             <>
               <ListItemText
                 primary={labelGrade}
                 secondary={
                   hasGrade
                     ? user.grade
                     : "You don’t have a grade set"
                 }
               />

               <ListItemSecondaryAction>
                 {hasGrade && (
                   <Tooltip title="Change">
                     <div>
                       <IconButton
                         disabled={performingAction}
                         onClick={() => this.showField("grade")}
                       >
                         <EditIcon />
                       </IconButton>
                     </div>
                   </Tooltip>
                 )}

                 {!hasGrade && (
                   <Button
                     color="primary"
                     disabled={performingAction}
                     variant="contained"
                     onClick={() => this.showField("grade")}
                   >
                     {labelAdd}
                   </Button>
                 )}
               </ListItemSecondaryAction>
             </>
           )}
         </ListItem>

         <ListItem>
           <Hidden xsDown>
             <ListItemIcon>
               <PersonIcon />
             </ListItemIcon>
           </Hidden>

           {!hasGender && (
             <ListItemIcon>
               <Tooltip title="No gender">
                 <WarningIcon color="error" />
               </Tooltip>
             </ListItemIcon>
           )}

           {showingField === "gender" && (
             <TextField
               autoComplete="gender"
               autoFocus
               disabled={performingAction}
               error={!!(errors && errors.gender)}
               fullWidth
               helperText={
                 errors && errors.gender
                   ? errors.gender[0]
                   : labelChange
               }
               label={labelGender}
               placeholder={hasGender && user.gender}
               required
               type="text"
               value={gender}
               variant="filled"
               InputLabelProps={{ required: false }}
               onBlur={this.hideFields}
               onKeyDown={(event) => this.handleKeyDown(event, "gender")}
               onChange={this.handleGenderChange}
             />
           )}

           {showingField !== "gender" && (
             <>
               <ListItemText
                 primary={labelGender}
                 secondary={
                   hasGender
                     ? user.gender
                     : "You don’t have a gender set"
                 }
               />

               <ListItemSecondaryAction>
                 {hasGender && (
                   <Tooltip title="Change">
                     <div>
                       <IconButton
                         disabled={performingAction}
                         onClick={() => this.showField("gender")}
                       >
                         <EditIcon />
                       </IconButton>
                     </div>
                   </Tooltip>
                 )}

                 {!hasGender && (
                   <Button
                     color="primary"
                     disabled={performingAction}
                     variant="contained"
                     onClick={() => this.showField("gender")}
                   >
                     {labelAdd}
                   </Button>
                 )}
               </ListItemSecondaryAction>
             </>
           )}
         </ListItem>

         <ListItem>
           <Hidden xsDown>
             <ListItemIcon>
               <PersonIcon />
             </ListItemIcon>
           </Hidden>

           {!hasSpecialNeeds && (
             <ListItemIcon>
               <Tooltip title="No special needs">
                 <WarningIcon color="error" />
               </Tooltip>
             </ListItemIcon>
           )}

           {showingField === "special-needs" && (
             <TextField
               autoComplete="special needs"
               autoFocus
               disabled={performingAction}
               error={!!(errors && errors.special_needs)}
               fullWidth
               helperText={
                 errors && errors.special_needs
                   ? errors.special_needs[0]
                   : labelChange
               }
               label={labelSpecNeeds}
               placeholder={hasSpecialNeeds && user.special_needs}
               required
               type="text"
               value={special_needs}
               variant="filled"
               InputLabelProps={{ required: false }}
               onBlur={this.hideFields}
               onKeyDown={(event) => this.handleKeyDown(event, "special-needs")}
               onChange={this.handleSpecialNeedsChange}
             />
           )}

           {showingField !== "special-needs" && (
             <>
               <ListItemText
                 primary={labelSpecNeeds}
                 secondary={
                   hasSpecialNeeds
                     ? user.special_needs
                     : "You don’t have a special needs set"
                 }
               />

               <ListItemSecondaryAction>
                 {hasSpecialNeeds && (
                   <Tooltip title="Change">
                     <div>
                       <IconButton
                         disabled={performingAction}
                         onClick={() => this.showField("special-needs")}
                       >
                         <EditIcon />
                       </IconButton>
                     </div>
                   </Tooltip>
                 )}

                 {!hasSpecialNeeds && (
                   <Button
                     color="primary"
                     disabled={performingAction}
                     variant="contained"
                     onClick={() => this.showField("special-needs")}
                   >
                     {labelAdd}
                   </Button>
                 )}
               </ListItemSecondaryAction>
             </>
           )}
         </ListItem>

         <ListItem>
           <Hidden xsDown>
             <ListItemIcon>
               <PersonIcon />
             </ListItemIcon>
           </Hidden>

           {!hasStudentEmail && (
             <ListItemIcon>
               <Tooltip title="No student email">
                 <WarningIcon color="error" />
               </Tooltip>
             </ListItemIcon>
           )}

           {showingField === "student-email" && (
             <TextField
               autoComplete="student email"
               autoFocus
               disabled={performingAction}
               error={!!(errors && errors.student_email)}
               fullWidth
               helperText={
                 errors && errors.student_email
                   ? errors.student_email[0]
                   : labelChange
               }
               label={labelStudEmail}
               placeholder={hasStudentEmail && user.student_email}
               required
               type="text"
               value={student_email}
               variant="filled"
               InputLabelProps={{ required: false }}
               onBlur={this.hideFields}
               onKeyDown={(event) => this.handleKeyDown(event, "student-email")}
               onChange={this.handleStudentEmailChange}
             />
           )}

           {showingField !== "student-email" && (
             <>
               <ListItemText
                 primary={labelStudEmail}
                 secondary={
                   hasStudentEmail
                     ? user.student_email
                     : "You don’t have a student email set"
                 }
               />

               <ListItemSecondaryAction>
                 {hasStudentEmail && (
                   <Tooltip title="Change">
                     <div>
                       <IconButton
                         disabled={performingAction}
                         onClick={() => this.showField("student-email")}
                       >
                         <EditIcon />
                       </IconButton>
                     </div>
                   </Tooltip>
                 )}

                 {!hasStudentEmail && (
                   <Button
                     color="primary"
                     disabled={performingAction}
                     variant="contained"
                     onClick={() => this.showField("student-email")}
                   >
                     {labelAdd}
                   </Button>
                 )}
               </ListItemSecondaryAction>
             </>
           )}
         </ListItem>

         <ListItem>
           <Hidden xsDown>
             <ListItemIcon>
               <PersonIcon />
             </ListItemIcon>
           </Hidden>

           {!hasPreferredDays && (
             <ListItemIcon>
               <Tooltip title="No preferred days">
                 <WarningIcon color="error" />
               </Tooltip>
             </ListItemIcon>
           )}

           {showingField === "preferred-days" && (
             <TextField
               autoComplete="preferred days"
               autoFocus
               disabled={performingAction}
               error={!!(errors && errors.preferred_days)}
               fullWidth
               helperText={
                 errors && errors.preferred_days
                   ? errors.preferred_days[0]
                   : labelChange
               }
               label={labelPrefDays}
               placeholder={hasPreferredDays && user.preferred_days}
               required
               type="text"
               value={preferred_days}
               variant="filled"
               InputLabelProps={{ required: false }}
               onBlur={this.hideFields}
               onKeyDown={(event) => this.handleKeyDown(event, "preferred-days")}
               onChange={this.handlePreferredDaysChange}
             />
           )}

           {showingField !== "preferred-days" && (
             <>
               <ListItemText
                 primary={labelPrefDays}
                 secondary={
                   hasPreferredDays
                     ? user.preferred_days
                     : "You don’t have a preferred days set"
                 }
               />

               <ListItemSecondaryAction>
                 {hasPreferredDays && (
                   <Tooltip title="Change">
                     <div>
                       <IconButton
                         disabled={performingAction}
                         onClick={() => this.showField("preferred-days")}
                       >
                         <EditIcon />
                       </IconButton>
                     </div>
                   </Tooltip>
                 )}

                 {!hasPreferredDays && (
                   <Button
                     color="primary"
                     disabled={performingAction}
                     variant="contained"
                     onClick={() => this.showField("preferred-days")}
                   >
                     {labelAdd}
                   </Button>
                 )}
               </ListItemSecondaryAction>
             </>
           )}
         </ListItem>

         <ListItem>
           <Hidden xsDown>
             <ListItemIcon>
               <PersonIcon />
             </ListItemIcon>
           </Hidden>

           {!hasPreferredTime && (
             <ListItemIcon>
               <Tooltip title="No preferred time">
                 <WarningIcon color="error" />
               </Tooltip>
             </ListItemIcon>
           )}

           {showingField === "preferred-time" && (
             <TextField
               autoComplete="preferred time"
               autoFocus
               disabled={performingAction}
               error={!!(errors && errors.preferred_time)}
               fullWidth
               helperText={
                 errors && errors.preferred_time
                   ? errors.preferred_time[0]
                   : labelChange
               }
               label={labelPrefTime}
               placeholder={hasPreferredTime && user.preferred_time}
               required
               type="text"
               value={preferred_time}
               variant="filled"
               InputLabelProps={{ required: false }}
               onBlur={this.hideFields}
               onKeyDown={(event) => this.handleKeyDown(event, "preferred-time")}
               onChange={this.handlePreferredTimeChange}
             />
           )}

           {showingField !== "preferred-time" && (
             <>
               <ListItemText
                 primary={labelPrefTime}
                 secondary={
                   hasPreferredTime
                     ? user.preferred_time
                     : "You don’t have a preferred time set"
                 }
               />

               <ListItemSecondaryAction>
                 {hasPreferredTime && (
                   <Tooltip title="Change">
                     <div>
                       <IconButton
                         disabled={performingAction}
                         onClick={() => this.showField("preferred-time")}
                       >
                         <EditIcon />
                       </IconButton>
                     </div>
                   </Tooltip>
                 )}

                 {!hasPreferredTime && (
                   <Button
                     color="primary"
                     disabled={performingAction}
                     variant="contained"
                     onClick={() => this.showField("preferred-time")}
                   >
                     {labelAdd}
                   </Button>
                 )}
               </ListItemSecondaryAction>
             </>
           )}
         </ListItem>

         {langUs && (
           <ListItem>
           <Hidden xsDown>
             <ListItemIcon>
               <PersonIcon />
             </ListItemIcon>
           </Hidden>

           {!hasFocusArea && (
             <ListItemIcon>
               <Tooltip title="No focus area">
                 <WarningIcon color="error" />
               </Tooltip>
             </ListItemIcon>
           )}

           {langUs && showingField === "focus-area" && (
             <TextField
               autoComplete="focus area"
               autoFocus
               disabled={performingAction}
               error={!!(errors && errors.focus_area)}
               fullWidth
               helperText={
                 errors && errors.focus_area
                   ? errors.focus_area[0]
                   : labelChange
               }
               label="For students on Independent Education Plans, describe the student’s focus areas of need."
               placeholder={hasFocusArea && user.focus_area}
               required
               type="text"
               value={focus_area}
               variant="filled"
               InputLabelProps={{ required: false }}
               onBlur={this.hideFields}
               onKeyDown={(event) => this.handleKeyDown(event, "focus-area")}
               onChange={this.handleFocusAreaChange}
             />
           )}

           {langUs && showingField !== "focus-area" && (
             <>
               <ListItemText
                 primary="For students on Independent Education Plans, describe the student’s focus areas of need."
                 secondary={
                   hasFocusArea
                     ? user.focus_area
                     : "You don’t have a focus area set"
                 }
               />

               <ListItemSecondaryAction>
                 {hasFocusArea && (
                   <Tooltip title="Change">
                     <div>
                       <IconButton
                         disabled={performingAction}
                         onClick={() => this.showField("focus-area")}
                       >
                         <EditIcon />
                       </IconButton>
                     </div>
                   </Tooltip>
                 )}

                 {!hasFocusArea && (
                   <Button
                     color="primary"
                     disabled={performingAction}
                     variant="contained"
                     onClick={() => this.showField("focus-area")}
                   >
                     {labelAdd}
                   </Button>
                 )}
               </ListItemSecondaryAction>
             </>
           )}
         </ListItem>
         )}

         {langUs && (
           <ListItem>
           <Hidden xsDown>
             <ListItemIcon>
               <PersonIcon />
             </ListItemIcon>
           </Hidden>

           {!hasFocusArea2 && (
             <ListItemIcon>
               <Tooltip title="No focus area">
                 <WarningIcon color="error" />
               </Tooltip>
             </ListItemIcon>
           )}

           {langUs && showingField === "focus-area2" && (
             <TextField
               autoComplete="focus area"
               autoFocus
               disabled={performingAction}
               error={!!(errors && errors.focus_area2)}
               fullWidth
               helperText={
                 errors && errors.focus_area2
                   ? errors.focus_area2[0]
                   : labelChange
               }
               label="For students of English as a Second Language, describe thestudent’s focus areas."
               placeholder={hasFocusArea2 && user.focus_area2}
               required
               type="text"
               value={focus_area2}
               variant="filled"
               InputLabelProps={{ required: false }}
               onBlur={this.hideFields}
               onKeyDown={(event) => this.handleKeyDown(event, "focus-area2")}
               onChange={this.handleFocusArea2Change}
             />
           )}

           {langUs && showingField !== "focus-area2" && (
             <>
               <ListItemText
                 primary="For students of English as a Second Language, describe the student’s focus areas."
                 secondary={
                   hasFocusArea2
                     ? user.focus_area2
                     : "You don’t have a focus area set"
                 }
               />

               <ListItemSecondaryAction>
                 {hasFocusArea2 && (
                   <Tooltip title="Change">
                     <div>
                       <IconButton
                         disabled={performingAction}
                         onClick={() => this.showField("focus-area2")}
                       >
                         <EditIcon />
                       </IconButton>
                     </div>
                   </Tooltip>
                 )}

                 {!hasFocusArea2 && (
                   <Button
                     color="primary"
                     disabled={performingAction}
                     variant="contained"
                     onClick={() => this.showField("focus-area2")}
                   >
                     {labelAdd}
                   </Button>
                 )}
               </ListItemSecondaryAction>
             </>
           )}
         </ListItem>
         )}

         <ListItem>
           <Hidden xsDown>
             <ListItemIcon>
               <AccessTimeIcon />
             </ListItemIcon>
           </Hidden>

           <Hidden xsDown>
             <ListItemText
               primary={labelSignIn}
             />
           </Hidden>

           <Hidden smUp>
             <ListItemText
               primary={labelSignIn}
             />
           </Hidden>
         </ListItem>

         <Box mt={1} mb={1}>
           <Divider light />
         </Box>

         <ListItem>
           <Hidden xsDown>
             <ListItemIcon>
               <DeleteForeverIcon />
             </ListItemIcon>
           </Hidden>

           <ListItemText
             primary={labelLogout}
             secondary={labelLogoutAcc}
           />

           <ListItemSecondaryAction>
             <Button
               color="secondary"
               disabled={performingAction}
               variant="contained"
               onClick={() => this.logout()}
             >
               {labelLogout}
             </Button>
           </ListItemSecondaryAction>
         </ListItem>
       </List>
      </Layout>
    )
  }
}

export default withStyles(styles)(Account)
